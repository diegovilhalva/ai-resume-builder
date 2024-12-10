"use client"

import ResumePreview from "@/components/ResumePreview"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { mapToResumeValues, ResumeServerData } from "@/lib/types"
import { formatDate } from "date-fns"
import { MoreVertical, Printer, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useTransition } from "react"
import { deleteResume } from "./actions"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import LoadingButton from "@/components/LoadingButton"
import  {useReactToPrint} from "react-to-print"

interface ResumeItemProps {
    resume: ResumeServerData
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const reactToPrinfFn = useReactToPrint({
        contentRef,
        documentTitle:resume.title || "Resume"
    }) 
    const wasUpdated = resume.updatedAt !== resume.createdAt
    return (
        <div className="group relative border rounde-lg rounded-lg border-transparent hover:border-border bg-secondary p-3">
            <div className="space-y-3">
                <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full text-center">
                    <p className="font-semibold line-clamp-1">{resume.title || 'No title'}</p>
                    {resume.description && (
                        <p className="line-clamp-2 text-sm">{resume.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        {wasUpdated ? 'Updated' : 'Created'}  on{" "}
                        {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
                    </p>
                </Link>
                <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full">
                    <ResumePreview resumeData={mapToResumeValues(resume)} className="overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow-lg" contentRef={contentRef} />
                    <div className="abusolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </Link>
            </div>
            <MoreMenu resumeId={resume.id} onPrintClick={reactToPrinfFn} />
        </div>
    )
}

interface MoreMenuProps {
    resumeId: string
    onPrintClick:() => void
}

const MoreMenu = ({ resumeId,onPrintClick }: MoreMenuProps) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                        <MoreVertical className="size-4" size="icon" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => setShowDeleteConfirmation(true)}>
                        <Trash2 className="size-4" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={onPrintClick}>
                        <Printer className="sixe-4" />
                        Print
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DeleteConfirmationDialog resumeId={resumeId} open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation} />
        </>
    )
}

interface DeleteConfirmationDialogProps {
    resumeId: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

const DeleteConfirmationDialog = ({ resumeId, open, onOpenChange }: DeleteConfirmationDialogProps) => {
    const { toast } = useToast()

    const [isPending, startTransition] = useTransition()

    async function handleDelete() {
        startTransition(async () => {
            try {
                await deleteResume(resumeId)
                onOpenChange(false)
            } catch (error) {
                toast({
                    variant: "destructive",
                    description: 'Something went wrong. Please try again'
                })
            }
        })
    }

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Resume?</DialogTitle>
                <DialogDescription>
                    This will permanently delete this resume. This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LoadingButton variant='destructive' onClick={handleDelete} loading={isPending}>
                    Delete
                </LoadingButton>
                <Button variant="secondary" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

export default ResumeItem
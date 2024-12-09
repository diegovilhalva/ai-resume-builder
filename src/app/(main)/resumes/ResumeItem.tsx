"use client"

import ResumePreview from "@/components/ResumePreview"
import { mapToResumeValues, ResumeServerData } from "@/lib/types"
import { formatDate } from "date-fns"
import Link from "next/link"

interface ResumeItemProps {
    resume: ResumeServerData
}

const ResumeItem = ({ resume }: ResumeItemProps) => {
    const wasUpdated = resume.updatedAt !== resume.createdAt
    return (
        <div className="group border rounde-lg rounded-lg border-transparent hover:border-border bg-secondary p-3">
            <div className="space-y-3">
                <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full text-center">
                    <p className="font-semibold line-clamp-1">{resume.title || 'No title'}</p>
                    {resume.description && (
                        <p className="line-clamp-2 text-sm">{resume.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        {wasUpdated ? 'Updated' : 'Created'}  on{" "} 
                        {formatDate(resume.updatedAt,"MMM d, yyyy h:mm a")}
                    </p>
                </Link>
                <Link href={`/editor?resumeId=${resume.id}`} className="inline-block w-full">
                    <ResumePreview resumeData={mapToResumeValues(resume)} className="overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow-lg" />
                    <div className="abusolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </Link>
            </div>
        </div>
    )
}

export default ResumeItem
import useDimensions from "@/hooks/useDimensions"
import { cn } from "@/lib/utils"
import { ResumeValues } from "@/lib/validation"
import { useRef } from "react"

interface ResumePreviewProps {
    resumeData: ResumeValues
    className?: string
}

const ResumePreview = ({ resumeData, className }: ResumePreviewProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { width } = useDimensions(containerRef)
    return (
        <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]", className)} ref={containerRef}>
            <div className={cn('space-y-6 p-6',!width && 'invisible')} style={{zoom:(1/794) * width
            }}>
                <h1 className="p-6 text-3xl font-bold ">
                    This text should change the size container div
                </h1>
            </div>
        </div>
    )
}

export default ResumePreview
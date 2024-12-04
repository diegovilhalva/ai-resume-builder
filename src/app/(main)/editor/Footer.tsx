import { Button } from "@/components/ui/button"
import Link from "next/link"
import { steps } from "./steps"
import { FileUserIcon, PenLineIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FooterProps {
    currentStep: string
    setCurrentStep: (step: string) => void
    showSmResumePreview:boolean
    setShowSmResumePreview:(show:boolean) => void
    isSaving:boolean
}

const Footer = ({ currentStep, setCurrentStep,setShowSmResumePreview,showSmResumePreview,isSaving }: FooterProps) => {
    const previousStep = steps.find(
        (_, index) => steps[index + 1]?.key === currentStep,
      )?.key
    
      const nextStep = steps.find(
        (_, index) => steps[index - 1]?.key === currentStep,
      )?.key
    return (
        <footer className="w-full border-t px-3 py-5">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={previousStep ? () => setCurrentStep(previousStep) : undefined} disabled={!previousStep}>Previous step</Button>
                    <Button onClick={nextStep ? () => setCurrentStep(nextStep) : undefined} 
                    disabled={!nextStep}>Next step</Button>
                </div>
                <Button variant="outline" size="icon" onClick={() => setShowSmResumePreview(!setShowSmResumePreview)} className="md:hidden" title={
                    showSmResumePreview ? "Show input form" : 'Show resume preview'
                }>
                    {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
                </Button>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" asChild>
                        <Link href="/resumes">Close</Link>
                    </Button>
                    <p className={cn("text-muted-foreground opacity-0",isSaving && "opacity-100")}>Saving...</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
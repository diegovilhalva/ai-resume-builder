"use client"

import { useSearchParams } from 'next/navigation'
import { steps } from './steps'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import { useState } from 'react'
import { ResumeValues } from '@/lib/validation'
import ResumePreviewSection from './ResumePreviewSection'
import { cn } from '@/lib/utils'
import useUnloadwarning from '@/hooks/useUnloadWarning'
import useAutoSaveResume from './useAutoSaveResume'
import { mapToResumeValues, ResumeServerData } from '@/lib/types'

interface ResumeEditoProps {
    resumeToEdit:ResumeServerData | null
}

const ResumeEditor = ({resumeToEdit}:ResumeEditoProps) => {
    const searchParams = useSearchParams()

    const [resumeData, setResumeData] = useState<ResumeValues>(
        resumeToEdit ? mapToResumeValues(resumeToEdit): {}
    )
    const [showSmResumePreview,setShowSmResumePreview] = useState(false)
    const {isSaving,hasUnsavedChanges} = useAutoSaveResume(resumeData)
    useUnloadwarning(hasUnsavedChanges)
    const currentStep = searchParams.get('step') || steps[0].key
    function setStep(key: string) {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("step", key)
        window.history.pushState(null, "", `?${newSearchParams.toString()}`)
    }
    

    const FormComponent = steps.find(
        (step) => step.key === currentStep
    )?.component
    
   
    return (
        <div className='flex  grow  flex-col'>
            <header className='space-y-1.5 border-b px-3 py-5 text-center'>
                <h1 className="text-2xl font-bold">Design your resume</h1>
                <p className="text-sm text-muted-foreground">
                    Follow the steps below to create your resume. Your progress will be saved automatically.
                </p>
            </header>
            <main className='relative grow'>
                <div className="absolute bottom-0 top-0 flex w-full">
                    <div className={cn("w-full  md:w-1/2 p-3 overflow-y-auto  space-y-6 md:block",showSmResumePreview && "hidden")}>
                        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
                        {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData} />}
                    </div>
                    <div className='grow md:border-r' />
                    <ResumePreviewSection resumeData={resumeData} setResumeData={setResumeData} className={cn(showSmResumePreview && "flex")} />
                </div>
            </main>
            <Footer currentStep={currentStep} setCurrentStep={setStep} 
            showSmResumePreview={showSmResumePreview} setShowSmResumePreview={setShowSmResumePreview}
            isSaving={isSaving} />
        </div>
    )
}

export default ResumeEditor
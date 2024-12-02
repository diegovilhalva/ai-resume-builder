"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GeneralInfoForm from './forms/GeneralInfoForm'
import PersonalInfoForm from './forms/PersonalInfoForm'
import { useSearchParams } from 'next/navigation'
import { steps } from './steps'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'


const ResumeEditor = () => {
    const searchParams  = useSearchParams()

    const currentStep = searchParams.get('step') || steps[0].key
    function setStep(key:string){
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set("step",key)
        window.history.pushState(null,"",`?${newSearchParams.toString()}`)
    }

    const FormComponent = steps.find(
        step => step.key === currentStep
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
                    <div className="w-full  md:w-1/2 p-3 overflow-y-auto  space-y-6">
                        <Breadcrumbs currentStep={currentStep}  setCurrentStep={setStep} />
                        {FormComponent && <FormComponent />}
                    </div>
                    <div className='grow md:border-r' />
                    <div className="hidden w-1/2 md:flex">
                        Right
                    </div>
                </div>
            </main>
           <Footer currentStep={currentStep} setCurrentStep={setStep} />
        </div>
    )
}

export default ResumeEditor
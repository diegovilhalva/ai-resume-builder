"use client"

import { Button } from '@/components/ui/button'
import usePremiumModal from '@/hooks/usePremiuModal'
import { PlusSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface CreateResumeButtonProps {
    canCreate:boolean
}

const CreateResumeButton = ({canCreate}:CreateResumeButtonProps) => {
    const premiumModal = usePremiumModal()
    if (canCreate) {
        return(
            <Button asChild className="mx-auto flex w-fit  gap-2">
            <Link href="/editor">
                <PlusSquare className="size-5" />
                New resume
            </Link>
        </Button>
        )
    }
    return (
        <Button onClick={() => premiumModal.setOpen(true)} className='mx-auto flex w-fit gap-2'>
            <PlusSquare className='size-5' />
            New Resume
        </Button>
    )
}

export default CreateResumeButton
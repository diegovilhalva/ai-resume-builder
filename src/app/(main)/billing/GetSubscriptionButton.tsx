"use client"

import { Button } from "@/components/ui/button"
import usePremiumModal from "@/hooks/usePremiuModal"


const GetSubscriptionButton = () => {
    const premiumModal = usePremiumModal()
  return (
    <Button onClick={() => premiumModal.setOpen(true)} variant="premium">
        Get Premium subscription
    </Button>
  )
}

export default GetSubscriptionButton
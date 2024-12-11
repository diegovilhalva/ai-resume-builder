import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PaletteIcon } from "lucide-react"
import { useState } from "react"
import { Color, ColorChangeHandler, TwitterPicker } from "react-color"
import { useSubscriptionLevel } from "../SubscriptionLevelProvider"
import usePremiumModal from "@/hooks/usePremiuModal"
import { canUseCustomizations } from "@/lib/permission"

interface ColorPickerProps {
    color: Color | undefined
    onChange: ColorChangeHandler
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
    const subscriptionLevel = useSubscriptionLevel()

    const premiumModal = usePremiumModal()
    const [showPopover, setShowPopover] = useState(false)
    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon" title="Change resume color" 
                onClick={() => {
                    if(!canUseCustomizations(subscriptionLevel)){
                        premiumModal.setOpen(true)
                        return
                    }
                    setShowPopover(true)

                    }}>
                    <PaletteIcon className="size-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="border-none bg-transparent shadow-none" align="end">
                <TwitterPicker color={color} onChange={onChange} triangle="top-right" />
            </PopoverContent>
        </Popover>
    )
}

export default ColorPicker
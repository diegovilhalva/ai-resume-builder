import { Button } from "@/components/ui/button"
import { Circle, Square, Squircle } from "lucide-react"
import { useSubscriptionLevel } from "../SubscriptionLevelProvider"
import usePremiumModal from "@/hooks/usePremiuModal"
import { canUseCustomizations } from "@/lib/permission"

export const BorderStyles = {
    SQUARE: "square",
    CIRCLE: "circle",
    SQUIRCLE: "squircle",
}

const borderStyles = Object.values(BorderStyles)


interface BorderStyleButtonProps {
    borderStyle: string | undefined
    onChange: (borderStyle: string) => void
}

const BorderStyleButton = ({ borderStyle, onChange }: BorderStyleButtonProps) => {
    const subscriptionLevel = useSubscriptionLevel()

    const premiumModal = usePremiumModal()
    function handleClick() {
        if (!canUseCustomizations(subscriptionLevel)) {
            premiumModal.setOpen(true)
            return
        }
        const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0
        const nextIndex = (currentIndex + 1) % borderStyles.length
        onChange(borderStyles[nextIndex])
    }

    const Icon =
        borderStyle === "square"
            ? Square
            : borderStyle === "circle"
                ? Circle
                : Squircle
    return (
        <Button variant="outline" size="icon" title="Change border style" onClick={handleClick}>
            <Icon className="size-5" />
        </Button>
    )
}

export default BorderStyleButton
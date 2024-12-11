import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "./actions";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiuModal";
import { canUseAITools } from "@/lib/permission";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const subscriptionLevel = useSubscriptionLevel()

    const premiumModal = usePremiumModal()
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if(!canUseAITools(subscriptionLevel)){
      premiumModal.setOpen(true)
      return
    }

    if (!resumeData) {
      toast({
        variant: "destructive",
        description: "No resume data provided.",
      });
      return;
    }

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
      toast({
        variant: "default",
        description: "Summary generated successfully!",
      });
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        variant: "destructive",
        description:
          "Unable to generate the summary. Check your input and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleClick}
      loading={loading}
      disabled={loading} 
      
    >
      <WandSparklesIcon className="mr-2 h-4 w-4" />
      Generate (AI)
    </LoadingButton>
  );
}

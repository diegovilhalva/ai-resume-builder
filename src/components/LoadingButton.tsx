import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  loaderSize?: string; 
}

export default function LoadingButton({
  loading,
  disabled,
  className,
  loaderSize = "h-5 w-5", 
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      aria-label={loading ? "Loading..." : undefined} 
      {...props}
    >
      {loading && <Loader2 className={cn(loaderSize, "animate-spin")} />}
      {props.children || (loading ? "Loading..." : "Button")} 
    </Button>
  );
}

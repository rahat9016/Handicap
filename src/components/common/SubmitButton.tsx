import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface ISubmitButtonProps {
  isLoading?: boolean;
  label: string;
  className?: string;
}

export default function SubmitButton({
  isLoading = false,
  label = "Submit",
  className = "",
}: ISubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        `
        flex items-center gap-2 text-white ml-auto
        ${
          isLoading
            ? "bg-dashboard-primary/70 cursor-not-allowed"
            : "bg-dashboard-primary hover:bg-dashboard-primary"
        }
        
      `,
        className
      )}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}

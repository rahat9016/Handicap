import { Button } from "@/components/ui/button";


interface FormButtonProps {
    isPending: boolean;
    buttonText: string;
}

export default function FormButton({ isPending, buttonText }: FormButtonProps) {
    return (
        <div>
            <Button
                type="submit"
                className="w-full rounded-[--radius] bg-accent text-accent-foreground hover:bg-accent/90"
            >
                {isPending ? "Loading..." : buttonText}
            </Button>
        </div>
    );
}



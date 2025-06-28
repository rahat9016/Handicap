import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


interface CustomDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
}

export default function CustomDialog({ open, onOpenChange, title, children }: CustomDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white w-[80vw]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
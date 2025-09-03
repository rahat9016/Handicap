import { ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface ConfirmToggleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isActive: boolean;
  onConfirm: () => void;
}

export const ConfirmToggleDialog = ({ isOpen, setIsOpen, isActive, onConfirm }: ConfirmToggleDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isActive ? "Deactivate User?" : "Activate User?"}</DialogTitle>
        </DialogHeader>
        <div className="py-5 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-dark text-center">
          Are you sure you want to {isActive ? "deactivate" : "activate"} this record?
        </p>
        {!isActive ? <div className="p-4 bg-green/10 rounded-full">
           <ShieldCheck size={40} className="text-green" />
        </div> :
        <div className="p-4 bg-rose-100 rounded-full">
           <ShieldX size={40} className="text-rose-700" />
        </div>}
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            className="bg-dashboard-primary text-white hover:bg-dashboard-primary/90"
          >
            {isActive ? "Deactivate" : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
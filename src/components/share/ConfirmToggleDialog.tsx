import { ShieldCheck, ShieldX } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ConfirmToggleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isActive: boolean;
  onConfirm: () => void;
  levelValue_1: string;
  levelValue_2: string;
}

export const ConfirmToggleDialog = ({
  isOpen,
  setIsOpen,
  isActive,
  onConfirm,
  levelValue_1,
  levelValue_2,
}: ConfirmToggleDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isActive ? "Deactivate Record?" : "Activate Record?"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-5 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-dark text-center">
            Are you sure you want to{" "}
            {isActive ? (
              <span className="lowercase">{levelValue_2}</span>
            ) : (
              <span className="lowercase">{levelValue_1}</span>
            )}{" "}
            this record?
          </p>
          {!isActive ? (
            <div className="p-4 bg-green/10 rounded-full">
              <ShieldCheck size={40} className="text-green" />
            </div>
          ) : (
            <div className="p-4 bg-rose-100 rounded-full">
              <ShieldX size={40} className="text-rose-700" />
            </div>
          )}
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
            {isActive ? levelValue_2 : levelValue_1}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

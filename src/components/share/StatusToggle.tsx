import { useState } from "react";
import { toast } from "react-toastify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ConfirmToggleDialog } from "./ConfirmToggleDialog";

interface StatusToggleProps {
  id: string | number;
  status: boolean;
  onConfirm: (id: string | number, newStatus: boolean) => Promise<void> | void;
  levelValue_1?: string;
  levelValue_2?: string;
}

export function StatusToggle({
  id,
  status,
  onConfirm,
  levelValue_1 = "Active",
  levelValue_2 = "Inactive",
}: StatusToggleProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);

  const handleToggle = (checked: boolean) => {
    setPendingStatus(checked);
    setIsDialogOpen(true);
  };

  const confirmToggle = async () => {
    if (pendingStatus === null) return;
    try {
      await onConfirm(id, pendingStatus);
      toast.success("Status updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update status");
    } finally {
      setIsDialogOpen(false);
      setPendingStatus(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Left label */}
      <span className="text-xs text-gray-600">{levelValue_2}</span>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="cursor-pointer inline-block">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={status}
                  onChange={(e) => handleToggle(e.target.checked)}
                />
                <div className="w-10 h-5 bg-gray rounded-full peer-checked:bg-green transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5 "></div>
              </div>
            </label>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {status ? `Click to ${levelValue_2}` : `Click to ${levelValue_1}`}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Right label */}
      <span className="text-xs text-gray-600">{levelValue_1}</span>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <ConfirmToggleDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          isActive={status}
          onConfirm={confirmToggle}
          levelValue_1={levelValue_1}
          levelValue_2={levelValue_2}
        />
      )}
    </div>
  );
}

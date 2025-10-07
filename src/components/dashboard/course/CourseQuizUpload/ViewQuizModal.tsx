import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import QuizDisplay from "./QuizDisplay";

export default function ViewQuizModal({
  isOpen,
  onClose,
  quizId
}: {
  isOpen: boolean;
  onClose: () => void;
  quizId: number
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-h-[95vh]  w-[800px] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle>View Quiz</DialogTitle>
        </DialogHeader>
        <QuizDisplay id={quizId} />
      </DialogContent>
    </Dialog>
  );
}

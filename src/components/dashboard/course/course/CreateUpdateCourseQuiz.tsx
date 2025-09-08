import ControlledInputField from "@/components/share/ControlledInputField";
import ControlledTextareaField from "@/components/share/ControlledTextareaField";
import InputLabel from "@/components/share/InputLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormProvider,
  useFieldArray,
  useForm
} from "react-hook-form";
import QuestionField from "./QuestionField";

export type Option = {
  optionText: string;
  isCorrect: boolean;
  sequenceNumber: number;
};

export type Question = {
  questionText: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  points: number;
  sequenceNumber: number;
  options: Option[];
};

export type QuizForm = {
  questions: Question[];
};
export default function CreateUpdateCourseQuiz({
  isOpen,
  onClose,
}: // initialValues,
{
  isOpen: boolean;
  onClose: () => void;
  // initialValues?: ICategory | undefined;
}) {
  const methods = useForm({
    mode: 'onChange',
    // resolver: yupResolver(quizFormSchema),
    defaultValues: {
      questions: [
        {
          questionText: '',
          questionType: 'MULTIPLE_CHOICE',
          points: 1,
          sequenceNumber: 1,
          options: [{ optionText: '', isCorrect: false, sequenceNumber: 1 }],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });
  console.log(methods.formState.errors)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data:any) => {
    console.log(data);
    // Handle form submission
  };

  const addQuestion = () => {
    append({
      questionText: '',
      questionType: 'MULTIPLE_CHOICE',
      points: 1,
      sequenceNumber: fields.length + 1,
      options: [{ optionText: '', isCorrect: false, sequenceNumber: 1 }],
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-white !max-w-[60vw] w-[60vw] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Create Quiz</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="mb-4">
          <InputLabel label="Name" required />
          <ControlledInputField
            name="name" 
            placeholder="Enter the quiz name..." 
          />
        </div>
        
        <div className="mb-4">
          <InputLabel label="Description" />
          <ControlledTextareaField 
            name="description" 
            placeholder="Write down here the description..." 
          />
        </div>
        {fields.map((field, questionIndex) => (
          <QuestionField 
            key={field.id} 
            questionIndex={questionIndex} 
            remove={remove} 
            isFirst={questionIndex === 0}
          />
        ))}
        
        <div className="flex justify-between mt-6">
          <Button type="button" onClick={addQuestion} variant="outline">
            Add Question
          </Button>
          <Button type="submit">
            Save Quiz
          </Button>
        </div>
      </form>
    </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

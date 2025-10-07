/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { usePost } from "@/hooks/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { IQuiz } from "../types/types";
import QuestionField from "./QuestionField";
import { quizFormSchema } from "./Schema/Quiz";

export type Option = {
  optionText: string;
  isCorrect: boolean;
  sequenceNumber: number;
};

export type Question = {
  questionText: string;
  questionType: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "MCQ";
  points: number;
  sequenceNumber: number;
  correctAnswer?: string;
  options: Option[];
};

export type QuizForm = {
  questions: Question[];
};
export default function CreateUpdateCourseQuiz({
  isOpen,
  onClose,
  id,
  contentId,
  quizId,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  contentId?: number | null;
  quizId?: number;
}) {
  // const { data: quizData } = useGet<IQuiz>(
  //   `/quizzes/${quizId}`,
  //   ["", String(quizId)],
  //   {},
  //   { enabled: quizId !== undefined }
  // );
  const { mutateAsync } = usePost(
    "/quizzes",
    (data) => {
      console.log("POST success", data);
    },
    [["courseDetails"]]
  );
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(quizFormSchema),
    defaultValues: {
      title: "",
      description: "",
      passingScore: 1,
      timeLimitMinutes: 15,
      questions: [
        {
          questionText: "",
          questionType: "MULTIPLE_CHOICE",
          points: 1,
          sequenceNumber: 1,
          options: [{ optionText: "", isCorrect: false, sequenceNumber: 1 }],
          correctAnswer: "true",
        },
      ],
    },
  });
console.log(quizId)
  // useEffect(() => {
  //   if (quizData) {
  //     methods.reset({
  //       title: quizData.title,
  //       description: quizData.description,
  //       passingScore: quizData.passingScore,
  //       timeLimitMinutes: quizData.timeLimitMinutes,
  //       questions: quizData.questions.map((q, idx) => ({
  //         questionText: q.questionText,
  //         questionType: q.questionType,
  //         points: q.points,
  //         sequenceNumber: q.sequenceNumber ?? idx + 1,
  //         options: q.options.map((opt, optIdx) => ({
  //           optionText: opt.optionText,
  //           isCorrect: opt.isCorrect,
  //           sequenceNumber: opt.sequenceNumber ?? optIdx + 1,
  //         })),
  //         correctAnswer: q.options.find((o) => o.isCorrect)?.optionText ?? "",
  //       })),
  //     });
  //   }
  // }, [quizData, methods.reset, methods]);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "questions",
  });
  const questions = methods.watch("questions");
  const passingScore = methods.watch("passingScore");

  const totalPoints =
    questions?.reduce((sum, question) => {
      return sum + (Number(question.points) || 0);
    }, 0) || 0;
  const isPassingScoreValid = Number(passingScore) <= Number(totalPoints);

  const onSubmit = (data: any) => {
    console.log(data)
    try {
      const payload: IQuiz = {
        title: data.title,
        description: data.description,
        passingScore: data.passingScore,
        timeLimitMinutes: data.timeLimitMinutes,
        courseId: id,
        questions: data?.questions.map((q: any, index: number) => {
          if (q.questionType === "MULTIPLE_CHOICE") {
            return {
              questionText: q.questionText,
              questionType: q.questionType,
              points: q.points,
              sequenceNumber: index + 1,
              options: q.options.map((o: any, oIndex: number) => ({
                optionText: o.optionText,
                isCorrect: o.isCorrect,
                sequenceNumber: oIndex + 1,
              })),
            };
          }
          if (q.questionType === "MCQ") {
            return {
              questionText: q.questionText,
              questionType: q.questionType,
              points: q.points,
              sequenceNumber: index + 1,
              options: q.options.map((o: any, oIndex: number) => ({
                optionText: o.optionText,
                isCorrect: o.isCorrect,
                sequenceNumber: oIndex + 1,
              })),
            };
          }
          if (q.questionType === "TRUE_FALSE") {
            return {
              questionText: q.questionText,
              questionType: "TRUE_FALSE",
              points: q.points,
              sequenceNumber: index + 1,
              options: [
                {
                  optionText: "True",
                  isCorrect: q.correctAnswer === "true",
                  sequenceNumber: 1,
                },
                {
                  optionText: "False",
                  isCorrect: q.correctAnswer === "false",
                  sequenceNumber: 2,
                },
              ],
            };
          }
          return q;
        }),
      };

      if (contentId) {
        payload.contentId = contentId;
      }

      mutateAsync(payload).then(() => {
        methods.reset();
        onClose();
      });
    } catch (error) {
      console.error("❌ Error creating quiz:", error);
    }
  };

  const addQuestion = () => {
    append({
      questionText: "",
      questionType: "MULTIPLE_CHOICE",
      points: 1,
      sequenceNumber: fields.length + 1,
      options: [{ optionText: "", isCorrect: false, sequenceNumber: 1 }],
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
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="mb-4">
              <InputLabel label="Name" required />
              <ControlledInputField
                name="title"
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
            <div className="mb-4">
              <InputLabel label="Time Limit (Minutes)" />
              <ControlledInputField
                name={`timeLimitMinutes`}
                type="number"
                placeholder="Enter the time limit in minutes"
              />
            </div>
            <div className="mb-4">
              <InputLabel label="Passing Score" required />
              <ControlledInputField
                name="passingScore"
                type="number"
                placeholder="Enter passing score..."
              />
              <div className="mt-2 text-sm text-gray-600">
                Total Points: {totalPoints} / Passing Score: {passingScore}
                {!isPassingScoreValid && (
                  <span className="text-red-500 ml-2">
                    ⚠️ Passing score cannot exceed total points!
                  </span>
                )}
                {isPassingScoreValid && totalPoints > 0 && (
                  <span className="text-green-500 ml-2">
                    ✓ Valid ({((passingScore / totalPoints) * 100).toFixed(0)}%
                    to pass)
                  </span>
                )}
              </div>
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
              <Button onClick={addQuestion} className="text-white">
                Add Question
              </Button>
              <Button type="submit" className="text-white">
                Save Quiz
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

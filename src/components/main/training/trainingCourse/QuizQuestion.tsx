"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Code } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface QuizOption {
  id: number;
  optionText: string;
  isCorrect: boolean;
  sequenceNumber: number;
}

interface QuizQuestionType {
  id: number;
  questionText: string;
  questionType: string;
  points: number;
  sequenceNumber: number;
  options: QuizOption[];
}

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: number, selectedOptions: number[]) => void;
  onPrevious?: () => void;
  canGoPrevious?: boolean;
  initialAnswer?: number[];
}

interface QuizFormData {
  selectedOptions: number[];
  singleOption: number;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onPrevious,
  initialAnswer = [],
  canGoPrevious = false,
}: QuizQuestionProps) {
  const { register, handleSubmit, watch, setValue, getValues, reset } =
    useForm<QuizFormData>({
      defaultValues: {
        selectedOptions: [],
        singleOption: 0,
      },
    });

  const selectedOptions = watch("selectedOptions") || [];
  const singleOption = watch("singleOption");
  const progress = (questionNumber / totalQuestions) * 100;

  const isMultipleChoice = question.questionType === "MULTIPLE_CHOICE";
  const isSingleChoice =
    question.questionType === "MCQ" || question.questionType === "TRUE_FALSE";

  useEffect(() => {
    if (initialAnswer && initialAnswer.length > 0) {
      if (isMultipleChoice) {
        setValue("selectedOptions", initialAnswer);
      } else if (isSingleChoice && initialAnswer[0]) {
        setValue("singleOption", initialAnswer[0]);
      }
    } else {
      reset({
        selectedOptions: [],
        singleOption: 0,
      });
    }
  }, [
    question.id,
    initialAnswer,
    isMultipleChoice,
    isSingleChoice,
    setValue,
    reset,
  ]);

  const onSubmit = (data: QuizFormData) => {
    if (isMultipleChoice) {
      onAnswer(question.id, data.selectedOptions || []);
    } else {
      onAnswer(question.id, [data.singleOption]);
    }
  };

  const handleCheckboxChange = (optionId: number, checked: boolean) => {
    const currentSelected = getValues("selectedOptions") || [];
    if (checked) {
      setValue("selectedOptions", [...currentSelected, optionId]);
    } else {
      setValue(
        "selectedOptions",
        currentSelected.filter((id) => id !== optionId)
      );
    }
  };

  const hasCode =
    question.questionText.includes("fn ") ||
    question.questionText.includes("let ") ||
    question.questionText.includes("match ") ||
    question.questionText.includes("{") ||
    question.questionText.includes("}");

  const isFormValid = isMultipleChoice
    ? selectedOptions.length > 0
    : singleOption > 0;

  return (
    <div className="min-h-screen font-inter">
      <div className=" mx-auto space-y-8">
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-[#000]">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#135393] to-[#0d67c2] bg-clip-text text-transparent">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-[#99999933]" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" bg-[#135393] rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-full bg-[#135393] text-[#ffffff] text-sm font-semibold">
                {question.questionType === "MULTIPLE_CHOICE" &&
                  "Multiple Select"}
                {question.questionType === "MCQ" && "Single Choice"}
                {question.questionType === "TRUE_FALSE" && "True/False"}
              </div>
              {isMultipleChoice && (
                <span className="text-sm text-[#b9b9b9]">
                  Select all that apply
                </span>
              )}
            </div>

            {hasCode ? (
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-[#135393]" />
                  <h2 className="text-2xl md:text-3xl font-black text-[#ffffff]">
                    Code Question
                  </h2>
                </div>
                <div className="bg-[#0f172a] rounded-xl p-6 border border-[#334155]">
                  <pre className="text-[#135393] font-mono text-sm md:text-base overflow-x-auto whitespace-pre-wrap">
                    <code>{question.questionText}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <h2 className="text-3xl md:text-4xl font-black text-[#ffffff] mb-8 text-balance leading-tight">
                {question.questionText}
              </h2>
            )}

            <div className="grid gap-4 mb-8">
              {question.options
                .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                .map((option) => {
                  const isSelected = isMultipleChoice
                    ? selectedOptions.includes(option.id)
                    : singleOption === option.id;

                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "group p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer",
                        isSelected
                          ? "border-[#1288ff] bg-gradient-to-r from-[#135393] to-[#0d67c2] text-[#ffffff] shadow-2xl scale-[1.02]"
                          : "border-[#1288ff] bg-[#ffffff1a] hover:border-[#135393] hover:bg-[#ffffff33]"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        {isMultipleChoice ? (
                          <input
                            type="checkbox"
                            checked={selectedOptions.includes(option.id)}
                            onChange={(e) =>
                              handleCheckboxChange(option.id, e.target.checked)
                            }
                            className="sr-only"
                          />
                        ) : (
                          <input
                            type="radio"
                            value={option.id}
                            {...register("singleOption", {
                              required: true,
                              valueAsNumber: true,
                            })}
                            className="sr-only"
                          />
                        )}

                        <div
                          className={cn(
                            "w-6 h-6 transition-all duration-300 flex items-center justify-center border-2",
                            isMultipleChoice ? "rounded-md" : "rounded-full",
                            isSelected
                              ? "border-[#ffffff] bg-[#ffffff]"
                              : "border-[#ffffff66] group-hover:border-[#135393]"
                          )}
                        >
                          {isSelected && (
                            <div
                              className={cn(
                                "bg-[#135393]",
                                isMultipleChoice
                                  ? "w-3 h-3 rounded-sm"
                                  : "w-3 h-3 rounded-full"
                              )}
                            ></div>
                          )}
                        </div>
                        <span className="text-lg font-semibold font-mono text-white">
                          {option.optionText}
                        </span>
                      </div>
                    </label>
                  );
                })}
            </div>

            <div className="flex gap-4">
              {canGoPrevious && onPrevious && (
                <Button
                  type="button"
                  onClick={onPrevious}
                  size="lg"
                  variant="outline"
                  className="h-16 text-xl font-bold border-[#ffffff33] bg-[#ffffff1a] hover:bg-[#ffffff33] text-[#ffffff] hover:text-[#ffffff] flex-1"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
              )}

              <Button
                type="submit"
                disabled={!isFormValid}
                size="lg"
                className={cn(
                  "h-16 text-xl font-bold bg-gradient-to-r from-[#135393] to-[#0d67c2] hover:from-[#135393] hover:to-[#0d67c2] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-[#0d68c244] transition-all duration-300 hover:scale-[1.02] text-[#ffffff] border border-[#1288ff]",
                  canGoPrevious ? "flex-1" : "w-full"
                )}
              >
                {questionNumber === totalQuestions
                  ? "Finish Quiz"
                  : "Next Question"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

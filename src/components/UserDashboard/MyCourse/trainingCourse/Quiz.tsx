"use client";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { useState } from "react";
import { toast } from "react-toastify";
import { IQuiz } from "../types/traning";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { QuizStart } from "./QuizStart";

type QuizProps = {
  quiz: {
    id: number;
    title: string;
    description: string;
    questions?: {
      id: number;
      questionText: string;
      options: { id: number; optionText: string; isCorrect: boolean }[];
    }[];
  };
  onQuizComplete?: () => void
};
interface QuizResult {
  id: number;
  score: number;
  passed: boolean;
  totalCorrect: number;
  totalMissed: number;
  totalMarks: number;
  percentage: number;
  startedAt: string;
  completedAt: string | null;
  userId: number;
  quizId: number;
}

export type QuizState = "start" | "quiz" | "results";
interface AnswerSet {
  [questionId: number]: number[];
}
export function Quiz({ quiz, onQuizComplete }: QuizProps) {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerSet>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const { data } = useGet<IQuiz>(
    `/quizzes/${quiz.id}`,
    ["quizzes", ""],
    undefined,
    {
      enabled: !!quiz.id,
      staleTime: 5 * 60 * 1000,
    }
  );
  const { mutateAsync } = usePost(
    `/quizzes/submit-quiz`,
    () => {
      console.log("POST success");
    },
    [["quiz"]]
  );
  const quizData = data?.data;
  const questions = quizData?.questions;
  const handleStartQuiz = () => {
    setQuizState("quiz");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAnswer = (questionId: number, selectedOptions: number[]) => {
    if (!questions) return;

    // keep a fresh merged object
    const newAnswers = {
      ...answers,
      [questionId]: selectedOptions,
    };

    setAnswers(newAnswers);

    // Calculate if answer is correct
    const currentQ = questions.find((q) => q.id === questionId);
    let isCorrect = false;

    if (currentQ?.questionType === "MULTIPLE_CHOICE") {
      const correctOptions = currentQ.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.id);
      const selectedSet = new Set(selectedOptions);
      const correctSet = new Set(correctOptions);

      isCorrect =
        selectedSet.size === correctSet.size &&
        [...selectedSet].every((id) => correctSet.has(id));
    } else {
      const selectedOption = currentQ?.options.find(
        (opt) => opt.id === selectedOptions[0]
      );
      isCorrect = selectedOption?.isCorrect || false;
    }
    console.log(isCorrect);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // build responses from newAnswers instead of stale answers
      const responses: { questionId: number; optionId: number }[] = [];

      Object.entries(newAnswers).forEach(([qId, optionIds]) => {
        (optionIds as number[]).forEach((optionId) => {
          responses.push({
            questionId: Number(qId),
            optionId: Number(optionId),
          });
        });
      });

      mutateAsync({
        quizId: quiz.id,
        responses,
      }).then((response) => {
        toast.success("Quiz submitted successfully!");
        setQuizResult(response); 
        setQuizState("results");
        if (onQuizComplete) {
          onQuizComplete(); // Mark quiz completed in parent
        }
      });
    }
  };
  const currentQuestion = questions?.[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id] || []
    : [];

  return (
    <div className="p-12 border rounded-xl shadow relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#32598071] to-[#0d68c22a] rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#32598071] to-[#0d68c22a] rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {quizState === "start" && quizData && (
        <QuizStart
          onStart={handleStartQuiz}
          quizTitle={quizData.title}
          quizDescription={quizData.description}
          totalQuestions={questions?.length ?? 0}
          timeLimitMinutes={quizData.timeLimitMinutes}
          passingScore={quizData.passingScore}
        />
      )}
      {quizState === "quiz" && questions && currentQuestion && (
        <QuizQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onPrevious={handlePreviousQuestion}
          canGoPrevious={currentQuestionIndex > 0}
          initialAnswer={currentAnswer}
        />
      )}

      {quizState === "results" && quizResult && (
        <QuizResults
          score={quizResult.score}
          totalCorrect={quizResult.totalCorrect}
          totalMissed={quizResult.totalMissed}
          totalMarks={quizResult.totalMarks}
          percentage={quizResult.percentage}
          passed={quizResult.passed}
        />
      )}
    </div>
  );
}

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
};
export type QuizState = "start" | "quiz" | "results";
interface AnswerSet {
  [questionId: number]: number[];
}
export function Quiz({ quiz }: QuizProps) {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerSet>({});
  const [score, setScore] = useState(0);

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
    setScore(0);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  const handleRestartQuiz = () => {
    setQuizState("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
  };
  const handleAnswer = (questionId: number, selectedOptions: number[]) => {
    if (!questions) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptions,
    }));

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

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const responses: { questionId: number; optionId: number }[] = [];

      Object.entries(answers).forEach(([questionId, optionIds]) => {
        optionIds.forEach((optionId: string) => {
          responses.push({
            questionId: Number(questionId),
            optionId: Number(optionId),
          });
        });
      });
      mutateAsync({
        quizId: quiz.id,
        responses: responses,
      }).then((response) => {
        toast.success("Quiz submitted successfully!");
        console.log("Message sent successfully:", response);
        
      });
      setQuizState("results");
    }
  };

  const currentQuestion = questions?.[currentQuestionIndex];
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id] || []
    : [];

  return (
    <div className="p-6 border rounded-xl shadow relative overflow-hidden">
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

      {quizState === "results" && questions && (
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          passingScore={quizData.passingScore}
          onRestart={handleRestartQuiz}
        />
      )}
      {/* {data?.data?.questions?.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-medium mb-2">{q.questionText}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleAnswer(q.id, opt.id)}
                />
                {opt.optionText}
              </label>
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleSubmit}>Submit Quiz</Button> */}
    </div>
  );
}

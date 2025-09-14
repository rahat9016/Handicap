"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { useState } from "react";
import { IQuiz } from "../types/traning";

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

export function Quiz({ quiz }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});

  const { data } = useGet<IQuiz>(`/quizzes/${quiz.id}`, ["quizzes", ""], undefined, {
    enabled: !!quiz.id,
    staleTime: 5 * 60 * 1000,
  });
  const handleAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };
  // console.log(data);
  const handleSubmit = () => {
    console.log("User Answers:", answers);
    // 👉 Call API here if you need to submit results
  };

  return (
    <div className="p-6 border rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
      <p className="mb-4 text-gray-600">{quiz.description}</p>

      {data?.data?.questions?.map((q) => (
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

      <Button onClick={handleSubmit}>Submit Quiz</Button>
    </div>
  );
}

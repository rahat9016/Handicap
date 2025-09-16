import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGet } from "@/hooks/useGet";
import { cn } from "@/lib/utils";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { IQuiz } from "../types/types";
import QuizSkeleton from "./QuizSkeleton";

export default function QuizDisplay({
  id,
  className,
}: {
  id: number;
  className?: string;
}) {
  const { data, isLoading } = useGet<IQuiz>(
    `/quizzes/${id}`,
    ["", String(id)],
    {},
    { enabled: id !== undefined }
  );
  const quizData = data?.data;
  const totalQuestions = quizData?.questions?.length;

  return (
    <div>
      {isLoading ? (
        <QuizSkeleton />
      ) : (
        <div>
          <div
            className={cn(
              "space-y-6 bg-slate-50 border p-6 rounded-lg shadow-sm",
              className
            )}
          >
            {quizData === undefined ? (
              <Card className="border rounded-xl">
                <CardContent className="flex items-center justify-center gap-4 p-4">
                  <p className="text-sm text-black font-inter text-center">
                    No course quiz available
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3b82f6]/10 text-[#1e40af] rounded-full text-sm font-medium">
                    <BookOpen className="w-4 h-4" />
                    Course Quiz
                  </div>
                  <h1 className="text-4xl font-bold text-balance">
                    {quizData?.title}
                  </h1>
                  <p className="text-lg text-[#475569] max-w-2xl mx-auto text-pretty">
                    {quizData?.description}
                  </p>

                  {/* Quiz Stats */}
                  <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] rounded-lg border border-[#e2e8f0]">
                      <span className="text-2xl font-bold text-[#1e40af]">
                        {totalQuestions}
                      </span>
                      <span className="text-sm text-[#475569]">Questions</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] rounded-lg border border-[#e2e8f0]">
                      <Clock className="w-4 h-4 text-[#475569]" />
                      <span className="text-sm font-medium">
                        {quizData?.timeLimitMinutes} minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#ffffff] rounded-lg border border-[#e2e8f0]">
                      <span className="text-sm text-[#475569]">
                        Total Points:
                      </span>
                      <span className="font-semibold">
                        {quizData?.passingScore}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 mt-5">
                  {quizData?.questions
                    ?.sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                    .map((question, index) => (
                      <Card
                        key={index}
                        className="shadow-sm hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-start gap-3 text-lg">
                            <Badge
                              variant="outline"
                              className="shrink-0 mt-0.5"
                            >
                              Q{index + 1}
                            </Badge>
                            <span className="text-balance leading-relaxed">
                              {question?.questionText}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {question &&
                              question?.options
                                ?.sort(
                                  (a, b) => a.sequenceNumber - b.sequenceNumber
                                )
                                .map((option, optionIndex) => (
                                  <div
                                    key={option.optionText}
                                    className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                                      option.isCorrect
                                        ? "bg-[#dcfce7] border-[#16a34a]/40"
                                        : "bg-[#f8fafc] border-[#e2e8f0] hover:bg-[#f1f5f9]"
                                    }`}
                                  >
                                    <div
                                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium shrink-0 mt-0.5 ${
                                        option.isCorrect
                                          ? "bg-[#16a34a] text-[#ffffff]"
                                          : "bg-[#e2e8f0] text-[#374151]"
                                      }`}
                                    >
                                      {String.fromCharCode(65 + optionIndex)}
                                    </div>
                                    <div className="flex-1 flex items-center justify-between">
                                      <span
                                        className={`font-mono text-sm leading-relaxed ${
                                          option.isCorrect
                                            ? "text-[#15803d] font-medium"
                                            : "text-[#374151]"
                                        }`}
                                      >
                                        {option.optionText}
                                      </span>
                                      {option.isCorrect && (
                                        <CheckCircle className="w-5 h-5 text-[#16a34a] shrink-0 ml-2" />
                                      )}{" "}
                                    </div>
                                  </div>
                                ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-[#e2e8f0]/50">
                            <div className="flex items-center justify-between text-sm text-[#475569]">
                              <span>Points: {question.points}</span>
                              <span>
                                Type: {question.questionType.replace("_", " ")}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

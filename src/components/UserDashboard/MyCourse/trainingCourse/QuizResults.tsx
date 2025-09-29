"use client";

import { Award, Sparkles, Target, Trophy } from "lucide-react";

interface QuizResultsProps {
  score: number;
  totalCorrect: number;
  totalMissed: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
}

export function QuizResults({
  totalCorrect,
  totalMissed,
  totalMarks,
  percentage,
  passed,
}: QuizResultsProps) {
  const getResultIcon = () => {
    if (percentage >= 90) return Trophy;
    if (percentage >= 70) return Award;
    return Target;
  };

  const ResultIcon = getResultIcon();

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center">
      <div className="w-full">
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#06d6a0] rounded-full blur-2xl opacity-40 animate-pulse-slow"></div>
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[#10b981] to-[#06d6a0] rounded-full flex items-center justify-center shadow-2xl animate-float">
              <ResultIcon className="w-8 h-8 text-[#ffffff]" />
            </div>
          </div>

          <h1 className="text-xl md:text-3xl font-black bg-gradient-to-r from-[#10b981] via-[#06d6a0] to-[#10b981] bg-clip-text text-transparent mb-2">
            Quiz Complete!
          </h1>
          <div
            className={`mt-4 px-6 py-2 rounded-full inline-block font-medium text-sm text-white ${
              passed ? "bg-[#10b981]" : "bg-[#ef4444]"
            }`}
          >
            {passed ? "✅ PASSED" : "❌ FAILED"}
            Total marks {totalMarks} 
          </div>
        </div>

        <div className="rounded-3xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Correct */}
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div className="text-3xl font-black text-[#22c55e] mb-1">
                {totalCorrect}
              </div>
              <div className="text-sm font-semibold text-[#ffffffb3] uppercase tracking-wide">
                Correct
              </div>
            </div>

            {/* Missed */}
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div className="text-3xl font-black text-[#ef4444] mb-1">
                {totalMissed}
              </div>
              <div className="text-sm font-semibold text-[#ffffffb3] uppercase tracking-wide">
                Missed
              </div>
            </div>

            {/* Percentage */}
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#06d6a0] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-[#10b981] to-[#06d6a0] bg-clip-text text-transparent mb-1">
                {percentage}%
              </div>
              <div className="text-sm font-semibold text-[#ffffffb3] uppercase tracking-wide">
                Score
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

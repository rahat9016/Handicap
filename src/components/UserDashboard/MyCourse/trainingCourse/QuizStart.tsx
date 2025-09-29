"use client"
import { Brain, CheckCircle, Clock, Sparkles, Target } from "lucide-react"

interface QuizStartProps {
  onStart: () => void
  quizTitle: string
  quizDescription: string
  totalQuestions: number
  timeLimitMinutes: number
  passingScore: number
}

export function QuizStart({
  onStart,
  quizTitle,
  quizDescription,
  totalQuestions,
  timeLimitMinutes,
  passingScore,
}: QuizStartProps) {
  return (
    <div className="mx-auto flex items-center justify-center font-inter">
      <div className="w-full ">
        {/* Hero Section */}
        <div className="text-center mb-6 space-y-3">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#135393] to-[#0d67c2] rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[#135393] to-[#0d67c2] rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-8 h-8 text-[#ffffff]" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-xl md:text-3xl font-black bg-gradient-to-r from-[#135393] via-[#135393] to-[#0d67c2] bg-clip-text text-transparent">
              {quizTitle}
            </h1>
            <p className="text-base md:text-lg text-[#000] font-medium mx-auto text-balance">
              {quizDescription}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#135393] to-[#0d67c2] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#333]">{totalQuestions} Questions</h3>
                <p className="text-[#000] text-sm">Multiple choice</p>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#135393] to-[#0d67c2] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Clock className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#333]">{timeLimitMinutes} Minutes</h3>
                <p className="text-[#000] text-sm">Time limit</p>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#135393] to-[#0d67c2] rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Target className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#333]">
                  Pass: {passingScore}/{totalQuestions}
                </h3>
                <p className="text-[#000] text-sm">Minimum score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-base text-[#000]">Ready to test your Rust knowledge?</p>
            <button
              onClick={onStart}
              className=" w-full h-10 px-6 text-base font-medium rounded-md shadow-sm transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#135393] to-[#0d67c2]"
            >
              <Sparkles className="w-5 h-5 text-[#fff]" />
              <span className="text-[#fff]">Start Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

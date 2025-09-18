"use client"

import { Button } from "@/components/ui/button"
import { Award, RotateCcw, Share2, Sparkles, Target, Trophy } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  passingScore: number
  onRestart: () => void
}

export function QuizResults({ score, totalQuestions, passingScore, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const passed = score >= passingScore

  const getResultMessage = () => {
    if (percentage >= 90) return "Outstanding Performance! 🎉"
    if (percentage >= 80) return "Excellent Work! 👏"
    if (percentage >= 70) return "Great Job! 👍"
    if (percentage >= 60) return "Good Effort! 💪"
    return "Keep Learning! 📚"
  }

  const getResultIcon = () => {
    if (percentage >= 90) return Trophy
    if (percentage >= 70) return Award
    return Target
  }

  const handleShare = async () => {
    const shareText = `I just scored ${score}/${totalQuestions} (${percentage}%) on the Rust Programming Quiz! 🧠✨`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rust Quiz Results",
          text: shareText,
        })
      } catch (err) {
        console.log(err)
        navigator.clipboard.writeText(shareText)
      }
    } else {
      navigator.clipboard.writeText(shareText)
    }
  }

  const ResultIcon = getResultIcon()

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#06d6a0] rounded-full blur-2xl opacity-40 animate-pulse-slow"></div>
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-[#10b981] to-[#06d6a0] rounded-full flex items-center justify-center shadow-2xl animate-float">
              <ResultIcon className="w-16 h-16 text-[#ffffff]" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#10b981] via-[#06d6a0] to-[#10b981] bg-clip-text text-transparent mb-4">
            Quiz Complete!
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-[#ffffffcc]">{getResultMessage()}</p>

          <div
            className={`mt-4 px-6 py-3 rounded-full inline-block font-bold text-lg ${
              passed ? "bg-[#10b981] text-[#ffffff]" : "bg-[#ef4444] text-[#ffffff]"
            }`}
          >
            {passed ? "✅ PASSED" : "❌ FAILED"} - Need {passingScore}/{totalQuestions} to pass
          </div>
        </div>

        {/* Score Display */}
        <div className="glass-strong rounded-3xl p-12 mb-8">
          <div className="text-center mb-8">
            <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-[#10b981] to-[#06d6a0] bg-clip-text text-transparent mb-4">
              {score}/{totalQuestions}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-[#ffffffb3]">{percentage}% Correct</div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div className="text-3xl font-black text-[#22c55e] mb-1">{score}</div>
              <div className="text-sm font-semibold text-[#ffffffb3] uppercase tracking-wide">Correct</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div className="text-3xl font-black text-[#ef4444] mb-1">{totalQuestions - score}</div>
              <div className="text-sm font-semibold text-[#ffffffb3] uppercase tracking-wide">Missed</div>
            </div>

            <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#06d6a0] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-[#ffffff]" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-[#10b981] to-[#06d6a0] bg-clip-text text-transparent mb-1">
                {percentage}%
              </div>
              <div className="text-sm font-semibold text-[#ffffffb3] uppercase tracking-wide">Score</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <Button
            onClick={onRestart}
            size="lg"
            className="flex-1 h-16 text-xl font-bold bg-gradient-to-r from-[#10b981] to-[#06d6a0] hover:from-[#059669] hover:to-[#05b894] shadow-2xl hover:shadow-[#10b98140] transition-all duration-300 hover:scale-105 text-[#ffffff]"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            size="lg"
            className="flex-1 h-16 text-xl font-bold glass-strong border-2 border-[#ffffff33] hover:border-[#10b98180] hover:scale-105 transition-all duration-300 bg-transparent text-[#ffffff]"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  )
}

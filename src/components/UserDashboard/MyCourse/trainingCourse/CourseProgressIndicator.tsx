"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Calendar, CheckCircle, Clock } from "lucide-react"
import { ICourseProgress } from "../types/traning"
interface CourseProgressIndicatorProps {
  progress: ICourseProgress
  className?: string
}

export function CourseProgressIndicator({ progress, className }: CourseProgressIndicatorProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green"
      case "IN_PROGRESS":
        return "bg-blue"
      default:
        return "bg-gray"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4" />
      case "IN_PROGRESS":
        return <Clock className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }


  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-1 rounded-full text-white ", getStatusColor(progress.status))}>
              {getStatusIcon(progress.status)}
            </div>
            <span className="font-medium text-sm">{progress.status.replace("_", " ")}</span>
          </div>
          <Badge variant="secondary" className="font-bold bg-gray">
            {Math.round(progress.percentComplete)}%
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={Math.round(progress.percentComplete)} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress.percentComplete)}% Complete</span>
          </div>
        </div>

        {/* Timing Information */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Started
            </span>
            {<span>{formatDate(progress.startedAt)}</span>}
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last Accessed
            </span>
            <span>{formatDate(progress.lastAccessed)}</span>
          </div>

          {progress.completedAt && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Completed
              </span>
              <span>{formatDate(progress.completedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

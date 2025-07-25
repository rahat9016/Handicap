import { Badge } from "@/components/ui/badge"
import { StatusOption } from "@/types/module"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"


const statusOptions: StatusOption[] = [
  { value: "COMPLETED", label: "Completed", icon: CheckCircle, color: "bg-green-500", textColor: "text-green-700" },
  { value: "IN_PROGRESS", label: "In Progress", icon: Clock, color: "bg-blue-500", textColor: "text-blue-700" },
  {
    value: "PENDING_REVIEW",
    label: "Pending Review",
    icon: AlertCircle,
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
  },
  { value: "BLOCKED", label: "Blocked", icon: XCircle, color: "bg-red-500", textColor: "text-red-700" },
]

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusOption = statusOptions.find((option) => option.value === status)
  if (!statusOption) return null

  const Icon = statusOption.icon
  return (
    <Badge variant="secondary" className={`flex items-center gap-1 ${statusOption.textColor}`}>
      <div className={`w-2 h-2 rounded-full ${statusOption.color}`} />
      <Icon className="w-3 h-3" />
      {statusOption.label}
    </Badge>
  )
}

export { statusOptions }

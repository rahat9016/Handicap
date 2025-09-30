"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "@/i18n/navigation"
import { Download, Eye } from "lucide-react"
import { ICertificate } from "../types/courseCertificate"



interface CourseCertificateProps {
  certificate: ICertificate
  onDownload?: () => void
}

export function CourseCertificate({ certificate, onDownload }: CourseCertificateProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green/20 text-green"
      case "intermediate":
        return "bg-yellow/20 text-yellow"
      case "advanced":
        return "bg-red/20 text-red"
      default:
        return "bg-gray/20 text-gray"
    }
  }
  const router = useRouter()
  return (
    <Card className="w-full p-6 bg-card">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground text-balance">{certificate.course.title}</h3>
        </div>
        <div>
          <Badge className={getLevelColor(certificate.course.level)}>{certificate.course.level}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Certificate Code</p>
          <p className="font-mono text-sm text-card-foreground">{certificate.uniqueCode}</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={() =>  router.push(`/user-dashboard/certifications/${certificate.id}`)} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button onClick={onDownload} size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Award, Calendar, CheckCircle } from "lucide-react"

interface CertificateData {
  studentName: string
  courseName: string
  completionDate: string
  instructorName: string
  courseHours: number
  certificateId: string
  organizationName?: string
  organizationLogo?: string
}

interface CertificateTemplateProps {
  data: CertificateData
  onDownload?: () => void
}

export function CertificateTemplate({ data, onDownload }: CertificateTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Certificate Container */}
      <div
        id="certificate-content"
        className="relative bg-white border-8 border-[color:var(--certificate-border)] rounded-lg shadow-2xl p-12 aspect-[4/3]"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, var(--certificate-accent) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--certificate-accent) 0%, transparent 50%),
            white
          `,
        }}
      >
        {/* Decorative Border Pattern */}
        <div className="absolute inset-4 border-2 border-[color:var(--certificate-gold)] rounded-md opacity-30"></div>
        <div className="absolute inset-6 border border-[color:var(--certificate-gold)] rounded-sm opacity-20"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="h-12 w-12 text-[color:var(--certificate-gold)]" />
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">CERTIFICATE</h1>
            <Award className="h-12 w-12 text-[color:var(--certificate-gold)]" />
          </div>
          <div className="h-1 w-32 bg-[color:var(--certificate-gold)] mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-2 font-medium tracking-widest">OF COMPLETION</p>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700">This is to certify that</p>

          <div className="py-4">
            <h2 className="text-5xl font-bold text-gray-800 mb-2 font-serif">{data.studentName}</h2>
            <div className="h-0.5 w-64 bg-gray-400 mx-auto"></div>
          </div>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            has successfully completed the course
          </p>

          <div className="py-2">
            <h3 className="text-3xl font-bold text-[color:var(--certificate-gold)] mb-2">{data.courseName}</h3>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{data.courseHours} hours</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Completed on {data.completionDate}</span>
              </div>
            </div>
          </div>

          <p className="text-base text-gray-700 mt-8">
            demonstrating dedication to professional development and mastery of the subject matter.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center">
            <div className="h-0.5 w-32 bg-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600 font-medium">{data.instructorName}</p>
            <p className="text-xs text-gray-500">Course Instructor</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-[color:var(--certificate-gold)] rounded-full flex items-center justify-center mb-2">
              <Award className="h-8 w-8 text-white" />
            </div>
            <p className="text-xs text-gray-500">{data.organizationName || "Course Provider"}</p>
          </div>

          <div className="text-center">
            <div className="h-0.5 w-32 bg-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600 font-medium">Certificate ID</p>
            <p className="text-xs text-gray-500 font-mono">{data.certificateId}</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-[color:var(--certificate-gold)] opacity-30"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-[color:var(--certificate-gold)] opacity-30"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-[color:var(--certificate-gold)] opacity-30"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-[color:var(--certificate-gold)] opacity-30"></div>
      </div>

      {/* Download Button */}
      {onDownload && (
        <div className="text-center mt-8">
          <Button
            onClick={onDownload}
            size="lg"
            className="bg-[color:var(--certificate-gold)] hover:bg-[color:var(--certificate-gold)]/90 text-[color:var(--certificate-gold-foreground)]"
          >
            Download Certificate
          </Button>
        </div>
      )}
    </div>
  )
}

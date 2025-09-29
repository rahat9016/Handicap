"use client"

import { CertificateTemplate } from "@/components/UserDashboard/CertificateTemplate/CertificateTemplate";
import { useEffect, useState } from "react";

// Mock API data - replace with your actual API call
const mockCertificateData = {
  studentName: "John Smith",
  courseName: "Full Stack Web Development",
  completionDate: "December 15, 2024",
  instructorName: "Sarah Johnson",
  courseHours: 120,
  certificateId: "CERT-2024-001234",
  organizationName: "TechEd Academy",
}
interface mockCertificateData {
    studentName: string;
    courseName: string;
    completionDate: string;
    instructorName: string;
    courseHours: number;
    certificateId: string;
    organizationName: string;
}


export default function CertificatePage() {
  const [certificateData, setCertificateData] = useState<mockCertificateData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace this with your actual API call
    const fetchCertificateData = async () => {
      try {
        // const response = await fetch('/api/certificate/[id]')
        // const data = await response.json()

        // Mock delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setCertificateData(mockCertificateData)
      } catch (error) {
        console.error("Failed to fetch certificate data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificateData()
  }, [])

  const handleDownload = () => {
    // Certificate download logic
    const certificateElement = document.getElementById("certificate-content")
    if (certificateElement) {
      // You can use libraries like html2canvas or jsPDF here
      // For now, we'll use the browser's print functionality
      window.print()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--certificate-gold)] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your certificate...</p>
        </div>
      </div>
    )
  }

  if (!certificateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Certificate not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray py-12">
      <CertificateTemplate data={certificateData} onDownload={handleDownload} />
    </div>
  )
}

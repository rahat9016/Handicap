"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Module } from "@/types/module"
import { PageHeader } from "@/components/dashboard/projectProgress/PageHeader"
import { StatusBadge } from "@/components/dashboard/projectProgress/StatusBadge"


export default function ModulesListPage() {
  const router = useRouter()
  const [modules] = useState<Module[]>([
    {
      id: "1",
      name: "User Authentication System",
      description:
        "Complete user authentication with login, registration, password reset, and multi-factor authentication. Includes social login integration and role-based access control.",
      status: "in-progress",
      clientCount: 3,
      createdDate: "2024-01-15",
      lastUpdated: "2024-01-20",
    },
    {
      id: "2",
      name: "Payment Gateway Integration",
      description:
        "Secure payment processing with multiple payment methods including credit cards, PayPal, and digital wallets. Features transaction management and refund processing.",
      status: "completed",
      clientCount: 2,
      createdDate: "2024-01-10",
      lastUpdated: "2024-01-18",
    },
    {
      id: "3",
      name: "Dashboard Analytics",
      description:
        "Real-time analytics dashboard with interactive charts, comprehensive reports, and advanced data visualization tools for business intelligence.",
      status: "pending",
      clientCount: 4,
      createdDate: "2024-01-12",
      lastUpdated: "2024-01-19",
    },
    {
      id: "4",
      name: "Mobile App API",
      description:
        "RESTful API endpoints for mobile application with comprehensive authentication, data management, and real-time synchronization capabilities.",
      status: "blocked",
      clientCount: 1,
      createdDate: "2024-01-08",
      lastUpdated: "2024-01-17",
    },
    {
      id: "5",
      name: "Email Marketing System",
      description:
        "Automated email marketing platform with campaign management, subscriber segmentation, and detailed analytics reporting.",
      status: "in-progress",
      clientCount: 5,
      createdDate: "2024-01-14",
      lastUpdated: "2024-01-21",
    },
  ])

  const handleModuleClick = (moduleId: string) => {
    router.push(`/en/modules/${moduleId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Project Modules" description="Manage and track all your project modules in one place" />

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {modules.length} Total Modules
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2 text-green-700">
              {modules.filter((m) => m.status === "completed").length} Completed
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2 text-blue-700">
              {modules.filter((m) => m.status === "in-progress").length} In Progress
            </Badge>
          </div>
          
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleModuleClick(module.id)}
            >
              <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 group-hover:text-white transition-colors">
                      {module.name}
                    </CardTitle>
                    <CardDescription className="text-slate-200 text-sm line-clamp-2">
                      {module.description}
                    </CardDescription>
                  </div>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2 flex-shrink-0" />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <StatusBadge status={module.status} />
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      {module.clientCount} clients
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {new Date(module.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Updated: {new Date(module.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200 group-hover:border-blue-500 group-hover:text-blue-600 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleModuleClick(module.id)
                    }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

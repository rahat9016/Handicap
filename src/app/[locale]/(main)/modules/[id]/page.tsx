"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Phone, Star, MessageCircle, Send, Plus } from "lucide-react"
import { Message, Module } from "@/types/module"
import { PageHeader } from "@/components/dashboard/projectProgress/PageHeader"
import { StatusBadge } from "@/components/dashboard/projectProgress/StatusBadge"


interface ModuleDetailsPageProps {
  params: {
    id: string
  }
}

export default function ModuleDetailsPage({ params }: ModuleDetailsPageProps) {
  const router = useRouter()
  const [moduleData] = useState<Module>({
    id: params.id,
    name: "User Authentication System",
    description:
      "Complete user authentication module with login, registration, password reset, and multi-factor authentication. Includes social login integration and role-based access control with advanced security features.",
    status: "in-progress",
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-20",
  })

  // Single client data
  const [clientData] = useState({
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    rating: 4,
    company: "TechCorp Solutions",
    lastUpdated: "2024-01-20",
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      clientId: "1",
      clientName: "Sarah Johnson",
      senderType: "client",
      message:
        "The authentication flow is incredibly smooth and user-friendly. I'm particularly impressed with the social login integration. However, I'd like to see more customization options for the login page design to match our brand better.",
      timestamp: "2024-01-18T10:30:00Z",
    },
    {
      id: "2",
      clientId: "1",
      clientName: "Admin",
      senderType: "admin",
      message:
        "Thank you for the feedback, Sarah! I'm glad you're happy with the social login integration. Regarding the customization options, we can definitely add more branding features. I'll schedule a call with you this week to discuss your specific requirements.",
      timestamp: "2024-01-18T14:20:00Z",
    },
    {
      id: "3",
      clientId: "1",
      clientName: "Sarah Johnson",
      senderType: "client",
      message:
        "That sounds perfect! I'm also wondering about the mobile responsiveness. How does the authentication system work on mobile devices? Our users are primarily mobile-first.",
      timestamp: "2024-01-19T09:15:00Z",
    },
    {
      id: "4",
      clientId: "1",
      clientName: "Admin",
      senderType: "admin",
      message:
        "Great question! The system is fully responsive and optimized for mobile devices. We've tested it across iOS and Android platforms. I can send you some screenshots of the mobile interface if you'd like to review them.",
      timestamp: "2024-01-19T11:30:00Z",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [messageType, setMessageType] = useState<"client" | "admin">("client")
  const [showNewMessageForm, setShowNewMessageForm] = useState(false)

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      clientId: clientData.id,
      clientName: messageType === "client" ? clientData.name : "Admin",
      senderType: messageType,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")
    setShowNewMessageForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push("/en/modules")}
            className="flex items-center gap-2 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </Button>
        </div>

        <PageHeader title="Module Details" description="Client communication and feedback management" />

        {/* Module Information Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">{moduleData.name}</CardTitle>
            <CardDescription className="text-blue-100">Module overview and current status</CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Description</Label>
                  <p className="text-gray-800 mt-2 leading-relaxed text-lg">{moduleData.description}</p>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Status</Label>
                  <div className="mt-2">
                    <StatusBadge status={moduleData.status} />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Created</Label>
                    <p className="text-gray-800 mt-1 text-lg">
                      {new Date(moduleData.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Updated</Label>
                    <p className="text-gray-800 mt-1 text-lg">
                      {new Date(moduleData.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Messages</Label>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{messages.length}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Client Rating</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-3xl font-bold text-yellow-500">{clientData.rating}</span>
                      <div className="flex">{getRatingStars(clientData.rating)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Information Card */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white">
            <CardTitle className="text-xl">Client Information</CardTitle>
            <CardDescription className="text-slate-200">Primary client for this module</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt={clientData.name} />
                <AvatarFallback className="bg-blue-500 text-white font-semibold text-xl">
                  {getInitials(clientData.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{clientData.name}</h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {clientData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {clientData.phone}
                  </div>
                </div>
                <p className="text-gray-600 mt-2 font-medium">{clientData.company}</p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  {getRatingStars(clientData.rating)}
                  <span className="text-sm text-gray-600 ml-2 font-semibold">({clientData.rating}/5)</span>
                </div>
                <p className="text-xs text-gray-500">
                  Last active: {new Date(clientData.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communication Section */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Communication Thread
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Interactive conversation between client and admin
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowNewMessageForm(!showNewMessageForm)}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* New Message Form */}
            {showNewMessageForm && (
              <Card className="mb-6 border-2 border-indigo-200 bg-indigo-50/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-indigo-800">Post New Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Message Type</Label>
                    <div className="flex gap-4 mt-2">
                      <Button
                        variant={messageType === "client" ? "default" : "outline"}
                        onClick={() => setMessageType("client")}
                        className={
                          messageType === "client"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "border-blue-300 text-blue-600 hover:bg-blue-50"
                        }
                      >
                        Client Feedback
                      </Button>
                      <Button
                        variant={messageType === "admin" ? "default" : "outline"}
                        onClick={() => setMessageType("admin")}
                        className={
                          messageType === "admin"
                            ? "bg-slate-600 hover:bg-slate-700"
                            : "border-slate-300 text-slate-600 hover:bg-slate-50"
                        }
                      >
                        Admin Reply
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      {messageType === "client" ? "Client Message" : "Admin Response"}
                    </Label>
                    <Textarea
                      placeholder={
                        messageType === "client"
                          ? "Enter client feedback or question..."
                          : "Enter admin response or update..."
                      }
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="mt-1 min-h-[100px] resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={
                        messageType === "client" ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-600 hover:bg-slate-700"
                      }
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewMessageForm(false)
                        setNewMessage("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages Thread */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Conversation History ({messages.length} messages)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No messages yet. Start the conversation!</p>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.senderType === "admin" ? "justify-end" : "justify-start"}`}
                        >
                          {message.senderType === "client" && (
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-blue-500 text-white text-sm">
                                {getInitials(clientData.name)}
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={`max-w-md px-4 py-3 rounded-lg ${
                              message.senderType === "admin"
                                ? "bg-slate-600 text-white"
                                : "bg-white border-2 border-blue-200 shadow-sm"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-semibold">
                                {message.senderType === "admin" ? "Admin" : clientData.name}
                              </span>
                              <span
                                className={`text-xs ${
                                  message.senderType === "admin" ? "text-slate-200" : "text-gray-500"
                                }`}
                              >
                                {formatTimestamp(message.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">{message.message}</p>
                          </div>

                          {message.senderType === "admin" && (
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-slate-600 text-white text-sm">AD</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Reply */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Quick Reply</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a quick message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setMessageType("admin")
                          handleSendMessage()
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        setMessageType("admin")
                        handleSendMessage()
                      }}
                      disabled={!newMessage.trim()}
                      className="bg-slate-600 hover:bg-slate-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

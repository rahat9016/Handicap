"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { PageHeader } from "@/components/dashboard/projectProgress/PageHeader";
import { StatusBadge } from "@/components/dashboard/projectProgress/StatusBadge";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import Cookies from "js-cookie";
import { ArrowLeft, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface IProjectModule {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
interface IUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleName: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
export interface IMessage {
  id: number;
  content: string;
  isFromAdmin: boolean;
  createdAt: string;
  moduleId: number;
}

export default function ModuleDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Cookies.get("userId");
  const { mutateAsync } = usePost(
    `/modules/${params.id}/messages`,
    (data) => {
      console.log("POST success", data);
    },
    [["organizations"]]
  );
  const { data: userData } = useGet<IUserInfo>(`/user/${userId}`, ["user"]);
  const { data } = useGet<IProjectModule>(`/project-modules/${params.id}`, [
    "project-modules",
  ]);
  const { data: message, refetch } = useGet<IMessage[]>(
    `/modules/${params.id}/messages`,
    ["messages"]
  );
  console.log(message);

  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"client" | "admin">("client");
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours =
      Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return (
        date.toLocaleDateString() +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const isAdmin = Boolean(Cookies.get("isAdmin"));
    mutateAsync({
      content: newMessage,
      isFromAdmin: isAdmin,
    }).then((response) => {
      console.log("Message sent successfully:", response);
      setNewMessage("");
      refetch();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
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

        <PageHeader
          title="Module Details"
          description="Client communication and feedback management"
        />

        {/* Module Information Card */}
        <Card className="shadow-xl border bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-black">
              {data?.data?.name}
            </CardTitle>
            <CardDescription className="text-black">
              Module overview and current status
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Description
                  </Label>
                  <div
  dangerouslySetInnerHTML={{ __html: data?.data?.description || "" }}
  className="rich-text-content mt-2 leading-relaxed text-lg"
/>

                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Status
                  </Label>
                  <div className="mt-2">
                    {data?.data && <StatusBadge status={data?.data?.status} />}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Created
                    </Label>
                    {data?.data?.createdAt && (
                      <p className="text-black mt-1 text-lg">
                        {new Date(data.data.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Updated
                    </Label>
                    {data?.data?.updatedAt && (
                      <p className="text-black mt-1 text-lg">
                        {new Date(data.data.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Messages
                    </Label>
                    <p className="text-3xl font-bold text-blue-600 mt-1">
                      {message?.data.length}
                    </p>
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
            <CardDescription className="text-slate-200">
              Primary client for this module
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt="user" />
                <AvatarFallback className="bg-blue text-white font-semibold text-xl">
                  {userData?.data?.firstName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {userData?.data?.firstName} {userData?.data?.lastName}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userData?.data?.email}
                  </div>
                  {userData?.data?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {userData?.data?.phone}
                    </div>
                  )}
                </div>
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
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* New Message Form */}
            {showNewMessageForm && (
              <Card className="mb-6 border-2 border-indigo-200 bg-indigo-50/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-indigo-800">
                    Post New Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Message Type
                    </Label>
                    <div className="flex gap-4 mt-2">
                      <Button
                        variant={
                          messageType === "client" ? "default" : "outline"
                        }
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
                        variant={
                          messageType === "admin" ? "default" : "outline"
                        }
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
                      {messageType === "client"
                        ? "Client Message"
                        : "Admin Response"}
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
                        messageType === "client"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-slate-600 hover:bg-slate-700"
                      }
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewMessageForm(false);
                        setNewMessage("");
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
                  Conversation History ({message?.data?.length} messages)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-4">
                    {message?.data?.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No messages yet. Start the conversation!
                      </p>
                    ) : (
                      message?.data?.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${
                            message?.isFromAdmin
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {
                            /* Message Bubble */
                            message?.isFromAdmin ? (
                              <Avatar className="w-14 h-14 p-1">
                                <AvatarImage
                                  src="/placeholder.svg"
                                  alt="user"
                                />
                                <AvatarFallback className="bg-slate-600 text-white text-sm">
                                  Admin
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <Avatar className="w-14 h-14 p-1  ">
                                <AvatarImage
                                  src="/placeholder.svg"
                                  alt="user"
                                />
                                <AvatarFallback className="bg-blue text-white text-sm">
                                  Client
                                </AvatarFallback>
                              </Avatar>
                            )
                          }

                          <div
                            className={`max-w-md px-4 py-3 rounded-lg ${
                              message.isFromAdmin
                                ? "bg-slate-600 text-white"
                                : "bg-white border-2 border-blue-200 shadow-sm"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-semibold">
                                {message.isFromAdmin ? "Admin" : "Client"}
                              </span>
                              <span
                                className={`text-xs ${
                                  message.isFromAdmin
                                    ? "text-slate-200"
                                    : "text-gray-500"
                                }`}
                              >
                                {formatTimestamp(message.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>
                          </div>

                          {/* {message.senderType === "admin" && (
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-slate-600 text-white text-sm">AD</AvatarFallback>
                            </Avatar>
                          )} */}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Reply */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Quick Reply
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a quick message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setMessageType("admin");
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => {
                        setMessageType("admin");
                        handleSendMessage();
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
  );
}

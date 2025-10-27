import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: "Admin",
      message: "Your order #12345 has been shipped.",
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: 2,
      user: "Support",
      message: "Your password was successfully changed.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: 3,
      user: "System",
      message: "New update available for your dashboard.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: 1,
      user: "Admin",
      message: "Your order #12345 has been shipped.",
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: 2,
      user: "Support",
      message: "Your password was successfully changed.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: 3,
      user: "System",
      message: "New update available for your dashboard.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: 1,
      user: "Admin",
      message: "Your order #12345 has been shipped.",
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: 2,
      user: "Support",
      message: "Your password was successfully changed.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: 3,
      user: "System",
      message: "New update available for your dashboard.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
    {
      id: 1,
      user: "Admin",
      message: "Your order #12345 has been shipped.",
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: 2,
      user: "Support",
      message: "Your password was successfully changed.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: 3,
      user: "System",
      message: "New update available for your dashboard.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
    },
  ]);

  // 🔹 Mark as read
  const handleMarkRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted transition">
          <Bell className="h-6 w-6 text-gray-700" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
              {unreadCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 && (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}

        {notifications.map((note) => (
          <DropdownMenuItem
            key={note.id}
            onClick={() => handleMarkRead(note.id)}
            className={`flex flex-col items-start hover:border-none ${
              !note.read ? "bg-light/50" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border overflow-hidden">
                <Image
                  src={"/office-man.png"}
                  width={512}
                  height={512}
                  alt="profile picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium font-inter">{note.user}</span>
                <span className="text-sm text-muted-foreground font-inter">
                  {note.message}
                </span>
                <span className="text-xs text-black/50">
                  {note.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

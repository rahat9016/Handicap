"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";

export const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 🔔 Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none"
      >
        <div className="w-8 h-8 md:w-12 md:h-12 bg-dashboard-primary rounded-full flex items-center justify-center text-white hover:opacity-90 transition">
          <Bell className="w-3 h-3 md:w-5 md:h-5" />
        </div>

        {unreadCount > 0 && (
          <div className="w-4 h-4 md:w-[22px] md:h-[22px] bg-[#DC3545] rounded-full flex items-center justify-center absolute -top-1 -right-1 md:-top-2 md:-right-2 shadow-sm">
            <p className="font-inter font-semibold text-white text-[10px] md:text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </p>
          </div>
        )}
      </button>

      {/* 🔽 Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <p className="font-semibold text-gray-800 dark:text-white">
              Notifications
            </p>
            {notifications.length > 0 && (
              <button
                onClick={() =>
                  notifications.forEach((n) => !n.read && markAsRead(n.id))
                }
                className="text-xs text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              No notifications yet
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                    n.read ? "bg-white dark:bg-gray-800" : "bg-blue-50 dark:bg-blue-900/30"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {n.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

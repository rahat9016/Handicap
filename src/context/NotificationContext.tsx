"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  notificationType: string;
  createdAt: string;
  read?: boolean;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userInformation } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const socket = connectSocket(Number(userInformation.id));

    // listen for real-time notifications
    socket.on("newNotification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      disconnectSocket();
    };
  }, [userInformation.id]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // Optionally call your REST API to mark as read in DB
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  return ctx;
};

import { useAppSelector } from "@/lib/redux/hooks";
import { connectSocket } from "@/lib/socket";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useGet } from "./useGet";
import { usePagination } from "./usePagination";
import { usePost } from "./usePost";

interface INotification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface IResponse {
  notifications: INotification[];
  unRead: number;
  total: number;
}

export function useNotifications(token?: string) {
  const [totalUnread, setTotalUnread] = useState<number>(0);
  const {
    userInformation: { id: userId },
  } = useAppSelector((state) => state.auth);

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const {
    currentPage,
    itemsPerPage,
    totalItems,
    setCurrentPage,
    setTotalItems,
  } = usePagination();
  const {
    data: initialData,
    isLoading,
    isSuccess,
  } = useGet<IResponse>(
    "/notifications",
    ["notifications", userId?.toString() || "", currentPage.toString()],
    {
      ...(itemsPerPage !== -1 && {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      }),
    },
    { enabled: !!userId }
  );

  const { mutateAsync: markAsReadApi } = usePost(
    "",
    (data) => {
      console.log("✅ Mark as read API success", data);
    },
    [["notifications"]] // Invalidate notifications cache
  );

  useEffect(() => {
    if (isSuccess && initialData) {
      if (currentPage === 1) {
        setNotifications(initialData?.data?.notifications);
      } else {
        // append new data
        setNotifications((prev) => [
          ...prev,
          ...initialData?.data?.notifications,
        ]);
      }

      setTotalUnread(initialData?.data?.unRead || 0);
      setTotalItems(initialData.data.total || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, initialData, currentPage]);

  useEffect(() => {
    if (!userId) return;

    let socket: Socket;
    let reconnectTimer: NodeJS.Timeout;

    const initializeSocket = () => {
      socket = connectSocket(userId, token);

      socket.on("connect", () => {
        console.log("🔗 Socket connected in hook");
        setIsConnected(true);
        // Clear any existing reconnect timer
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
        }
        // Re-join notification room on reconnect
        socket.emit("joinNotifications", { userId });
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected in hook");
        setIsConnected(false);

        // Try to reconnect after a short delay
        reconnectTimer = setTimeout(() => {
          if (!socket.connected) {
            console.log("🔄 Attempting to reconnect...");
            socket.connect();
          }
        }, 5000);
      });

      socket.on("newNotification", (notification: INotification) => {
        console.log("📩 New Notification:", notification);
        setNotifications((prev) => [notification, ...prev]);
        setTotalUnread((prev) => prev + 1);
      });

      socket.on("readNotification", (id: string) => {
        console.log("✅ Notification read:", id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === Number(id) ? { ...n, isRead: true } : n))
        );
      });
    };

    initializeSocket();

    const connectionCheckInterval = setInterval(() => {
      if (!socket.connected) {
        console.log("🔄 Reconnecting socket...");
        socket.connect();
      }
    }, 30000); // Check every 30 seconds

    // Cleanup when component unmounts
    return () => {
      clearInterval(connectionCheckInterval);
      // Don't disconnect socket here to maintain connection across components
      // Only remove event listeners
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newNotification");
      socket.off("readNotification");
      socket.off("deleteNotification");
    };
  }, [userId, token]);


  const markAsRead = useCallback(async (id: string) => {
  try {
    console.log('📝 Marking notification as read via API:', id);
  
    setNotifications((prev) =>
      prev.map((n) => n.id === Number(id) ? { ...n, isRead: true } : n)
    );
    setTotalUnread((prev) => Math.max(0, prev - 1));
    await markAsReadApi({
      endpoint: `/notifications/mark-read`,
      data: {
        notificationIds: [Number(id)] 
      },
    });

    // Also emit socket event if connected
    const socket = connectSocket(userId, token);
    if (socket.connected) {
      socket.emit("markAsRead", { id, userId });
    }

    console.log('✅ Successfully marked notification as read:', id);
  } catch (error) {
    console.error('❌ Failed to mark notification as read:', error);
    
    // Revert optimistic update on error
    setNotifications((prev) =>
      prev.map((n) => n.id === Number(id) ? { ...n, isRead: false } : n)
    );
    setTotalUnread((prev) => prev + 1);
  }
}, [markAsReadApi, userId, token]);


  const reconnect = () => {
    const socket = connectSocket(userId, token);
    socket.connect();
  };

  const loadMore = useCallback(() => {
    if (isLoading) {
      console.log("⏳ Loading in progress, skipping");
      return;
    }

    if (notifications.length >= totalItems) {
      console.log("✅ All items loaded, cannot load more");
      return;
    }

    console.log(`📜 Loading page ${currentPage + 1}...`);
    setCurrentPage(currentPage + 1); // ✅ Simple number instead of function
  }, [
    isLoading,
    notifications.length,
    totalItems,
    currentPage,
    setCurrentPage,
  ]);

  return {
    notifications,
    markAsRead,
    loading: isLoading,
    isConnected,
    reconnect,
    totalUnread,
    loadMore,
    totalItems,
  };
}

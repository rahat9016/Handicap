import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 10;

export const connectSocket = (userId: number | string, token?: string) => {

  if (socket?.disconnected) {
    socket.connect();
    return socket;
  }
  
  // If socket exists and is connected, return it
  if (socket?.connected) {
    return socket;
  }

  // If no socket exists, create a new one
  socket = io(
    process.env.NEXT_PUBLIC_API_URL || "http://163.47.146.233:4035",
    {
      transports: ["websocket", "polling"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true, // Ensure auto-connect is enabled
    }
  );

  socket.on("connect", () => {
    console.log("🔗 Connected to socket:", socket?.id);
    reconnectAttempts = 0;
    socket?.emit("joinNotifications", { userId });
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket");
  });

  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log("🔄 Reconnection attempt:", attemptNumber);
    reconnectAttempts = attemptNumber;
  });

  socket.on("reconnect_failed", () => {
    console.error(
      "💥 Failed to reconnect after",
      maxReconnectAttempts,
      "attempts"
    );
    // Optionally switch to polling or show offline mode
  });
  return socket;
};

export const getSocket = () => socket;

export const getReconnectAttempts = () => reconnectAttempts;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    reconnectAttempts = 0;
  }
};

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: number, token?: string) => {
    if (socket) return socket;

    socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4047", {
        transports: ["websocket"],
        auth: { token }, // optional for JWT authentication
    });

    socket.on("connect", () => {
        console.log("🔗 Socket connected:", socket?.id);
        socket?.emit("joinNotifications", { userId });
    });

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

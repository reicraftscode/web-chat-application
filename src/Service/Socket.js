import io from "socket.io-client";
const API_LINK = "http://localhost:3000/";
const socket = io(API_LINK, { transports: ["websocket", "polling"] });

export { socket, io };

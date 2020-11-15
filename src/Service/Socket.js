import io from "socket.io-client";
const API_LINK = "http://localhost:3000/";
const socket = io.connect(API_LINK);

export { socket, io };

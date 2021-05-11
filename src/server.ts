import axios from "axios";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";

export const server = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000,
});

export const socket = io(SERVER_URL);

export function openSocket() {
    socket.io.open((err) => {
        if (err) return console.error(err.message);
        console.log("Success");
    });
}

socket.io.on("open", () => {
    console.log("SOCKET OPENED");
});

socket.io.on("packet", (packet) => {
    console.log(packet);
});

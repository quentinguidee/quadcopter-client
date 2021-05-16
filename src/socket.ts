import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_SERVER_URL!);

export function openSocket() {
    socket.io.open((err) => {
        if (err) return console.error(err.message);
        console.log("Success");
    });

    socket.io.on("open", () => {
        console.log("SOCKET OPENED");
    });

    socket.io.on("packet", (packet) => {
        console.log(packet);
    });
}

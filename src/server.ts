import axios from "axios";

export const server = axios.create({
    baseURL: process.env.SERVER_URL,
    timeout: 1000,
});

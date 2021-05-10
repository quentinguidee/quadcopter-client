import axios from "axios";

const SERVER_URL = "http://localhost:3001";

export const server = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000,
});

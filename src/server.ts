import axios from "axios";

export const server = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    timeout: 1000,
});

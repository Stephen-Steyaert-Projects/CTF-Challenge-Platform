import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_PUBLIC_API_URL,
  withCredentials: true, // important for JWT HttpOnly cookies
});

export default api;

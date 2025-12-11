import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:4000",
  withCredentials: true, // important for JWT HttpOnly cookies
});

export default api;

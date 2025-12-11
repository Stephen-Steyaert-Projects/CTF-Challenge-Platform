import axios from "axios";

const api = axios.create({
  baseURL: "http://backend:5000",
  withCredentials: true, // important for JWT HttpOnly cookies
});

export default api;

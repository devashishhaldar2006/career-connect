import axios from "axios";

// Default to local backend during local development or use configured VITE_API_URL
const apiBase =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});

export default axiosInstance;
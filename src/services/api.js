// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getCVConfig = () => API.get("/api/config/get");
export const setCVConfig = (config) => API.post("/api/config/set", { config });
export const clearCVConfig = () => API.post("/api/config/clear");
export const resetCVConfig = () => API.post("/api/config/reset");

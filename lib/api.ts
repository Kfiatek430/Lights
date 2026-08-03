import axios from "axios";
import { SERVER_URL } from "@/lib/constants";
import { recordActionSent } from "@/lib/actionClock";

export const apiClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (config.method === "post") recordActionSent();
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

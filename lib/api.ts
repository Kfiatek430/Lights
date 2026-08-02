import { SERVER_URL } from "@/lib/constants";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`${SERVER_URL}${path}`, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401 && typeof window !== "undefined") {
    window.location.href = "/login";
  }

  return response;
}

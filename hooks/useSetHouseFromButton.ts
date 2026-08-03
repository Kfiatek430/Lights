import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

async function setHouseFromButton() {
  await apiClient.post("/house/setFromBut", {});
}

export function useSetHouseFromButton() {
  return useMutation({
    mutationFn: setHouseFromButton,
  });
}

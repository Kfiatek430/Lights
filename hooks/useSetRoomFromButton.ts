import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type setRoomFromButtonProps = {
  roomId: number;
};

async function setRoomFromButton({ roomId }: setRoomFromButtonProps) {
  await apiClient.post(`/house/room/${roomId}/setFromBut`, {});
}

export function useSetFromButton() {
  return useMutation({
    mutationFn: setRoomFromButton,
  });
}

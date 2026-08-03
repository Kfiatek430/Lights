import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type setRoomValueProps = {
  roomId: number;
  value: number;
};

async function setRoomValue({ roomId, value }: setRoomValueProps) {
  await apiClient.post(`/house/room/${roomId}/setValue3b`, { value });
}

export function useSetRoomValue() {
  return useMutation({
    mutationFn: setRoomValue,
  });
}

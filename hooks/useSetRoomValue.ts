import { apiFetch } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type setRoomValueProps = {
  roomId: number;
  value: number;
};

async function setRoomValue({ roomId, value }: setRoomValueProps) {
  await apiFetch(`/house/room/${roomId}/setValue3b`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: value }),
  });
}

export function useSetRoomValue() {
  return useMutation({
    mutationFn: setRoomValue,
  });
}

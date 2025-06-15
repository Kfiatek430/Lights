import { SERVER_URL } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";

type setRoomFromButtonProps = {
  roomId: number;
};

async function setRoomFromButton({ roomId }: setRoomFromButtonProps) {
  await fetch(`${SERVER_URL}/house/room/${roomId}/setFromBut`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
}

export function useSetFromButton() {
  return useMutation({
    mutationFn: setRoomFromButton,
  });
}

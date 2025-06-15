import { SERVER_URL } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";

type setRoomPatternProps = {
  roomId: number;
  patternId: number;
};

async function setRoomPattern({ roomId, patternId }: setRoomPatternProps) {
  await fetch(`${SERVER_URL}/house/room/${roomId}/setPattern`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: patternId }),
  });
}

export function useSetRoomPattern() {
  return useMutation({
    mutationFn: setRoomPattern,
  });
}

import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type setRoomPatternProps = {
  roomId: number;
  patternId: number;
};

async function setRoomPattern({ roomId, patternId }: setRoomPatternProps) {
  await apiClient.post(`/house/room/${roomId}/setPattern`, {
    value: patternId,
  });
}

export function useSetRoomPattern() {
  return useMutation({
    mutationFn: setRoomPattern,
  });
}

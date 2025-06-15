import { SERVER_URL } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";

type setLineValueProps = {
  roomId: number;
  lineId: number;
  mode: string;
  value: number;
};

async function setLineValue({
  roomId,
  lineId,
  mode,
  value,
}: setLineValueProps) {
  await fetch(
    `${SERVER_URL}/house/room/${roomId}/line/${lineId}/setValue${mode}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: value }),
    }
  );
}

export function useSetLineValue() {
  return useMutation({
    mutationFn: setLineValue,
  });
}

import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type setHouseValueProps = {
  value: number;
};

async function setHouseValue({ value }: setHouseValueProps) {
  await apiClient.post("/house/setValue3b", { value });
}

export function useSetHouseValue() {
  return useMutation({
    mutationFn: setHouseValue,
  });
}

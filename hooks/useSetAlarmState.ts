import { apiClient } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type setAlarmStateProps = {
  value: number;
};

async function setAlarmState({ value }: setAlarmStateProps) {
  await apiClient.post("/house/alarmSetState", { value });
}

export function useSetAlarmState() {
  return useMutation({
    mutationFn: setAlarmState,
  });
}

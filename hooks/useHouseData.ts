"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { House } from "@/types";

export const houseQueryKey = ["house"] as const;

async function fetchHouse(): Promise<House> {
  const { data } = await apiClient.get<House>("/house/details", {
    params: { timestamp: 0, withInfo: "Y" },
  });
  return data;
}

export function useHouseQuery() {
  return useQuery({
    queryKey: houseQueryKey,
    queryFn: fetchHouse,
  });
}

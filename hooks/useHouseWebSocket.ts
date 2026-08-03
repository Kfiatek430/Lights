"use client";

import { Client } from "@stomp/stompjs";
import { useEffect } from "react";

export type HouseWsEvent =
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "message"; bytes: number; serverTimestamp: number };

export function useHouseWebSocket(
  onMessage: Function,
  onEvent?: (event: HouseWsEvent) => void,
) {
  useEffect(() => {
    const client = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/houseWS`,
      reconnectDelay: 5000,
      onConnect: () => {
        onEvent?.({ type: "connected" });
        client.subscribe("/topic/house", (message) => {
          const newHouse = JSON.parse(message.body);
          onMessage(newHouse);
          onEvent?.({
            type: "message",
            bytes: message.body.length,
            serverTimestamp: newHouse.timestamp,
          });
        });
      },
      onDisconnect: () => onEvent?.({ type: "disconnected" }),
      onWebSocketClose: () => onEvent?.({ type: "disconnected" }),
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);
}

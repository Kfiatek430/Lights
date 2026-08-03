"use client";

import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";

export type HouseWsEvent =
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "message"; bytes: number; serverTimestamp: number };

export function useHouseWebSocket(
  onMessage: Function,
  onEvent?: (event: HouseWsEvent) => void,
) {
  const onMessageRef = useRef(onMessage);
  const onEventRef = useRef(onEvent);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onEventRef.current = onEvent;
  });

  useEffect(() => {
    const client = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/houseWS`,
      reconnectDelay: 5000,
      onConnect: () => {
        onEventRef.current?.({ type: "connected" });
        client.subscribe("/topic/house", (message) => {
          const newHouse = JSON.parse(message.body);
          onMessageRef.current(newHouse);
          onEventRef.current?.({
            type: "message",
            bytes: message.body.length,
            serverTimestamp: newHouse.timestamp,
          });
        });
      },
      onDisconnect: () => onEventRef.current?.({ type: "disconnected" }),
      onWebSocketClose: () => onEventRef.current?.({ type: "disconnected" }),
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);
}

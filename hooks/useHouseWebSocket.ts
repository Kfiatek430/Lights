"use client";

import { Client } from "@stomp/stompjs";
import { useEffect } from "react";

export function useRoomsWebSocket(onMessage: Function) {
  useEffect(() => {
    const client = new Client({
      brokerURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/houseWS`,
      onConnect: () => {
        client.subscribe("/topic/house", (message) => {
          const newHouse = JSON.parse(message.body);
          onMessage(newHouse);
        });
      },
    });

    client.activate();
  });
}

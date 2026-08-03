"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { House } from "@/types";
import { mergeObjects } from "@/lib/utils";
import { useHouseWebSocket, HouseWsEvent } from "@/hooks/useHouseWebSocket";
import { houseQueryKey, useHouseQuery } from "@/hooks/useHouseData";
import { getLastActionSentAt } from "@/lib/actionClock";
import HouseManager from "./house/HouseManager";
import AlarmCard from "./house/AlarmCard";
import WifiPresenceCard from "./house/WifiPresenceCard";
import StatusCard from "./house/StatusCard";
import RoomsContainer from "./rooms/RoomsContainer";

export type WsStats = {
  connected: boolean;
  reconnects: number;
  loads: number;
  bytes: number;
  lastServerTimestamp: number;
  lastReceivedAt: number;
  lastActionSentAt: number;
  wholeTimeMs: number | null;
};

const HouseDashboard = () => {
  const queryClient = useQueryClient();
  const { data: house } = useHouseQuery();
  const [stats, setStats] = useState<WsStats>({
    connected: false,
    reconnects: 0,
    loads: 0,
    bytes: 0,
    lastServerTimestamp: house?.timestamp ?? 0,
    lastReceivedAt: 0,
    lastActionSentAt: 0,
    wholeTimeMs: null,
  });

  useHouseWebSocket(
    (updatedData: House) => {
      queryClient.setQueryData<House>(houseQueryKey, (prevHouse) =>
        prevHouse ? mergeObjects(updatedData, prevHouse) : updatedData,
      );
    },
    (event: HouseWsEvent) => {
      setStats((prev) => {
        if (event.type === "connected") {
          return {
            ...prev,
            connected: true,
            reconnects: prev.loads > 0 ? prev.reconnects + 1 : prev.reconnects,
          };
        }
        if (event.type === "disconnected") {
          return { ...prev, connected: false };
        }
        const receivedAt = Date.now();
        const sentAt = getLastActionSentAt();
        const wholeTimeMs =
          sentAt && receivedAt - sentAt < 1500
            ? receivedAt - sentAt
            : prev.wholeTimeMs;
        return {
          ...prev,
          loads: prev.loads + 1,
          bytes: prev.bytes + event.bytes,
          lastServerTimestamp: event.serverTimestamp,
          lastReceivedAt: receivedAt,
          lastActionSentAt: sentAt || prev.lastActionSentAt,
          wholeTimeMs,
        };
      });
    },
  );

  const roomsGridRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const el = roomsGridRef.current;
    if (!el) return;

    const MAX_ROWS = 2;

    const computeHeight = () => {
      const isLgUp = window.matchMedia("(min-width: 1024px)").matches;
      if (!isLgUp) {
        setSidebarHeight(undefined);
        return;
      }

      const style = getComputedStyle(el);
      const rowSizes = style.gridTemplateRows
        .split(" ")
        .map((v) => parseFloat(v))
        .filter((v) => !isNaN(v));
      const rowGap = parseFloat(style.rowGap || "0") || 0;

      if (rowSizes.length === 0) {
        setSidebarHeight(undefined);
        return;
      }

      const rowsToUse = Math.min(MAX_ROWS, rowSizes.length);
      let total = rowSizes.slice(0, rowsToUse).reduce((a, b) => a + b, 0);
      if (rowsToUse > 1) total += rowGap * (rowsToUse - 1);
      setSidebarHeight(total);
    };

    computeHeight();

    const resizeObserver = new ResizeObserver(computeHeight);
    resizeObserver.observe(el);
    window.addEventListener("resize", computeHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", computeHeight);
    };
  }, [house?.rooms.length]);

  if (!house) return null;

  return (
    <>
      {house.alarmState === "ARMED_ACTIVE" && (
        <div className="fixed inset-0 z-[100] pointer-events-none animate-alarm-pulse" />
      )}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-start">
        <div
          style={{ height: sidebarHeight }}
          className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col justify-between gap-3 overflow-y-auto"
        >
          <HouseManager house={house} />
          <AlarmCard house={house} />
          <WifiPresenceCard house={house} />
          <StatusCard house={house} stats={stats} />
        </div>
        <div
          style={{ height: sidebarHeight }}
          className="hidden lg:block w-px bg-border"
        />
        <RoomsContainer rooms={house.rooms} ref={roomsGridRef} />
      </div>
    </>
  );
};

export default HouseDashboard;

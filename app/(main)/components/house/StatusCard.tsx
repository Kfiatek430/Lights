"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { House } from "@/types";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { WsStats } from "../HouseDashboard";

type StatusCardProps = {
  house: House;
  stats: WsStats;
};

function formatKB(bytes: number): string {
  const kB = Math.round(bytes / 1024);
  if (kB < 1000) return `${kB}kB`;
  const MB = Math.round((kB / 1024) * 10) / 10;
  return `${MB}MB`;
}

function formatClock(ts: number): string {
  if (!ts) return "-";
  return new Date(ts).toLocaleTimeString();
}

const StatusCard: FC<StatusCardProps> = ({ house, stats }) => {
  const uartOnline = house.uartStatus?.includes("On") ?? false;

  return (
    <Card className="w-full gap-3 py-4">
      <CardHeader>
        <CardTitle className="text-lg">Status</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <tbody>
            <tr>
              <td className="text-muted-foreground pr-2 py-0.5">
                Wysłano / Załadowano
              </td>
              <td className="text-right font-mono">
                {formatClock(stats.lastActionSentAt)} /{" "}
                {formatClock(stats.lastReceivedAt)}
                {stats.wholeTimeMs !== null ? ` (${stats.wholeTimeMs}ms)` : ""}
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground pr-2 py-0.5">Wczytania</td>
              <td className="text-right font-mono">
                {stats.loads} ({formatKB(stats.bytes)})
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground pr-2 py-0.5">UART</td>
              <td className="text-right font-mono">
                {house.uartBaudRate}{" "}
                <span
                  className={cn(
                    uartOnline ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {uartOnline ? "Połączono" : "Rozłączono"}
                </span>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground pr-2 py-0.5">WS</td>
              <td className="text-right font-mono">
                <span>{stats.reconnects} rekon.</span>{" "}
                <span
                  className={cn(
                    stats.connected ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {stats.connected ? "Połączono" : "Rozłączono"}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default StatusCard;

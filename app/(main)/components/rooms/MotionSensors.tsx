"use client";

import { Room } from "@/types";
import { formatElapsed } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface MotionSensorsProps {
  room: Room;
  variant?: "compact" | "full";
}

const MotionSensors: FC<MotionSensorsProps> = ({ room, variant = "compact" }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const sensors = room.motionSensors ?? [];
  if (sensors.length === 0) return null;

  const names = room.info.motionSensorNames ?? [];

  return (
    <div
      className={cn(
        "w-full flex flex-row flex-wrap justify-center items-center",
        variant === "compact" ? "gap-3" : "gap-6",
      )}
    >
      {sensors.map((sensor, idx) => {
        const elapsedSeconds = (now - sensor.changeTimestamp) / 1000;
        return (
          <div
            key={sensor.id}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs opacity-70 h-4 leading-4">
              {names[idx] ?? (sensors.length > 1 ? `Czujnik ${idx + 1}` : "Główny")}
            </span>
            <Activity
              className={cn(
                variant === "compact" ? "size-5" : "size-7",
                sensor.active
                  ? "text-emerald-500"
                  : "text-muted-foreground opacity-40",
              )}
            />
            <span
              className={cn(
                "font-mono",
                variant === "compact" ? "text-xs" : "text-sm",
                sensor.active ? "text-emerald-500" : "text-muted-foreground",
              )}
            >
              {formatElapsed(elapsedSeconds)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MotionSensors;

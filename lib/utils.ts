import { Line, Room } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatElapsed(seconds: number): string {
  if (seconds < 0) seconds = 0;
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function mergeObjects<T extends object>(source: T, target: T): T {
  const merged = { ...target } as Record<string, unknown>;
  const src = source as Record<string, unknown>;
  for (const key in src) {
    if (key === "rooms") {
      const rooms = [...(merged[key] as Room[])];
      (src[key] as Room[]).forEach((room) => {
        const index = rooms.findIndex((r) => r.id === room.id);
        const mergedRoom = mergeObjects(
          room as unknown as Record<string, unknown>,
          (index === -1
            ? {}
            : (rooms[index] as unknown as Record<string, unknown>)),
        ) as unknown as Room;
        if (index === -1) {
          rooms.push(mergedRoom);
        } else {
          rooms[index] = mergedRoom;
        }
      });
      merged[key] = rooms;
    } else if (key === "lines") {
      const lines = [...(merged[key] as Line[])];
      (src[key] as Line[]).forEach((line) => {
        const index = lines.findIndex((l) => l.id === line.id);
        const mergedLine = mergeObjects(
          line as unknown as Record<string, unknown>,
          (index === -1
            ? {}
            : (lines[index] as unknown as Record<string, unknown>)),
        ) as unknown as Line;
        if (index === -1) {
          lines.push(mergedLine);
        } else {
          lines[index] = mergedLine;
        }
      });
      merged[key] = lines;
    } else {
      merged[key] = src[key];
    }
  }

  return merged as T;
}

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
      (src[key] as Room[]).forEach((room) => {
        const rooms = merged[key] as Room[];
        rooms[room.id] = mergeObjects(
          room as unknown as Record<string, unknown>,
          rooms[room.id] as unknown as Record<string, unknown>,
        ) as unknown as Room;
      });
    } else if (key === "lines") {
      (src[key] as Line[]).forEach((line) => {
        const lines = merged[key] as Line[];
        lines[line.id] = mergeObjects(
          line as unknown as Record<string, unknown>,
          lines[line.id] as unknown as Record<string, unknown>,
        ) as unknown as Line;
      });
    } else {
      merged[key] = src[key];
    }
  }

  return merged as T;
}

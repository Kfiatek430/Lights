import { Line, Room } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeObjects(source: any, target: any) {
  const merged = { ...target };
  for (const key in source) {
    if (key === "rooms") {
      source[key].forEach((room: Room) => {
        merged[key][room.id] = mergeObjects(room, merged[key][room.id]);
      });
    } else if (key === "lines") {
      source[key].forEach((line: Line) => {
        merged[key][line.id] = mergeObjects(line, merged[key][line.id]);
      });
    } else {
      merged[key] = source[key];
    }
  }

  return merged;
}

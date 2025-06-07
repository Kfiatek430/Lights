import { PATTERNS } from "@/lib/constants";

// Line and Room related types
export interface Line {
  id: number;
  value3bReq: number;
  value3b: number;
  value8b: number;
  value16b: number;
}

export interface RoomInfo {
  name: string;
  chips: number;
  lines: number;
  patterns: number;
  values3b: number;
  patternNames: string[];
  lineNames: string[];
}

export interface Room {
  id: number;
  online: boolean;
  info: RoomInfo;
  motion: boolean;
  motionValue: number;
  motionChangeTimestamp: number;
  pattern: number;
  minValue3b: number;
  maxValue3b: number;
  minValue3bReq: number;
  maxValue3bReq: number;
  lines: Line[];
}

// House type
export interface House {
  maxValue3b: number;
  minValue3b: number;
  name: string;
  rooms: Room[];
  timestamp: number;
  twilight: boolean;
  uartBaudRate: string;
  uartStatus: string;
}

// Mode and Pattern types
export type Mode = "3b" | "8b" | "16b";
export type Pattern = (typeof PATTERNS)[number];

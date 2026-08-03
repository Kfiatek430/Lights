import { PATTERNS } from "@/lib/constants";

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
  motionSensors: number;
  motionSensorNames?: string[];
}

export interface MotionSensor {
  id: number;
  active: boolean;
  changeTimestamp: number;
}

export interface Room {
  id: number;
  online: boolean;
  info: RoomInfo;
  motionSensors: MotionSensor[];
  pattern: number;
  minValue3b: number;
  maxValue3b: number;
  minValue3bReq: number;
  maxValue3bReq: number;
  offTimestamp?: number;
  lines: Line[];
}

export type Power = "Mains" | "Battery";
export type AlarmState = "OFF" | "ARMED_IDLE" | "ARMED_ACTIVE";

export interface WifiDevice {
  id: number;
  name: string;
  mac: string;
}

export interface House {
  maxValue3b: number;
  minValue3b: number;
  name: string;
  rooms: Room[];
  timestamp: number;
  twilight: boolean;
  uartBaudRate: string;
  uartStatus: string;
  power: Power;
  doorbellActive: boolean;
  alarmState: AlarmState;
  wifiDevices?: WifiDevice[];
  wifiStatus?: boolean[];
}

export type Mode = "3b" | "8b" | "16b";
export type Pattern = (typeof PATTERNS)[number];

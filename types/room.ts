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
  onLine: boolean;
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

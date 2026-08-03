"use client";

import { Room } from "@/types";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Slider from "@/components/ui/slider";
import OnlineBadge from "../badges/OnlineBadge";
import OfflineBadge from "../badges/OfflineBadge";
import DetailsDialog from "./DetailsDialog";
import EditDialog from "./EditDialog";
import { cn } from "@/lib/utils";
import RoomPowerButtons from "./RoomPowerButtons";
import MotionSensors from "./MotionSensors";
import { useSetRoomValue } from "@/hooks/useSetRoomValue";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const IsOnline = useMemo(() => {
    if (room.online === true) return <OnlineBadge />;
    return <OfflineBadge />;
  }, [room.online]);

  const anyMotionActive = room.motionSensors?.some((s) => s.active) ?? false;
  const [displayMotion, setDisplayMotion] = useState(anyMotionActive);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [maxValue3b, setMaxValue3b] = useState([room.maxValue3b]);
  const [minValue3b, setMinValue3b] = useState(room.minValue3b);
  const setRoomValue = useSetRoomValue();

  const handleMainValueChange = (newValues: number[]) => {
    setRoomValue.mutate({ roomId: room.id, value: newValues[0] });
    setMaxValue3b(newValues);
    setMinValue3b(newValues[0]);
  };

  useEffect(() => {
    setMinValue3b(room.minValue3b);
  }, [room.minValue3b]);

  useEffect(() => {
    setMaxValue3b([room.maxValue3b]);
  }, [room.maxValue3b]);

  useEffect(() => {
    if (anyMotionActive) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setDisplayMotion(true);

      timeoutRef.current = setTimeout(() => {
        setDisplayMotion(false);
      }, 60000);
    }
  }, [anyMotionActive]);

  return (
    <Card
      className={cn(
        "w-full gap-6 py-6",
        displayMotion ? "shadow-[0px_0px_10px_5px_#48bb78]" : "", // #
      )}
    >
      <CardHeader>
        <div className="w-full flex flex-row justify-between items-center gap-3">
          <CardTitle className="text-xl">
            <span className="line-clamp-2 leading-tight">{room.info.name}</span>
          </CardTitle>
          {IsOnline}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4">
        <RoomPowerButtons roomId={room.id} />
        <MotionSensors room={room} variant="compact" />
        <Slider
          value={maxValue3b}
          onValueChange={handleMainValueChange}
          max={7}
          staticThumb={minValue3b}
        />
      </CardContent>
      <CardFooter className="w-full flex flex-row justify-end items-end gap-3">
        <DetailsDialog room={room} />
        <EditDialog room={room} />
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

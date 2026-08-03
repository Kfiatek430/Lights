"use client";

import { Room } from "@/types";
import { FC, useEffect, useMemo, useRef, useState } from "react";
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
import { useSyncedState } from "@/hooks/useSyncedState";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const IsOnline = useMemo(() => {
    if (room.online === true) return <OnlineBadge />;
    return <OfflineBadge />;
  }, [room.online]);

  const anyMotionActive = room.motionSensors?.some((s) => s.active) ?? false;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prevAnyMotionActive, setPrevAnyMotionActive] =
    useState(anyMotionActive);
  const [cooldownActive, setCooldownActive] = useState(anyMotionActive);
  if (anyMotionActive !== prevAnyMotionActive) {
    setPrevAnyMotionActive(anyMotionActive);
    if (anyMotionActive) {
      setCooldownActive(true);
    }
  }
  const displayMotion = anyMotionActive || cooldownActive;

  const [maxValue3b, setMaxValue3b] = useSyncedState(room.maxValue3b);
  const [minValue3b, setMinValue3b] = useSyncedState(room.minValue3b);
  const setRoomValue = useSetRoomValue();

  const handleMainValueChange = (newValues: number[]) => {
    setRoomValue.mutate({ roomId: room.id, value: newValues[0] });
    setMaxValue3b(newValues[0]);
    setMinValue3b(newValues[0]);
  };

  useEffect(() => {
    if (!anyMotionActive) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setCooldownActive(false);
    }, 60000);
  }, [anyMotionActive]);

  return (
    <Card
      className={cn(
        "w-full gap-6 py-6",
        displayMotion ? "shadow-[0px_0px_10px_5px_#48bb78]" : "", // #
      )}
    >
      <CardHeader>
        <div className="w-full flex flex-row justify-between items-start gap-3">
          <CardTitle className="text-xl min-h-[2.5em] flex items-start">
            <span className="line-clamp-2 leading-tight">{room.info.name}</span>
          </CardTitle>
          <span>{IsOnline}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4">
        <RoomPowerButtons roomId={room.id} />
        <MotionSensors room={room} variant="compact" />
        <Slider
          value={[maxValue3b]}
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

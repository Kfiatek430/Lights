"use client";

import { Room } from "@/types";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Slider from "../ui/slider";
import OnlineBadge from "./OnlineBadge";
import OfflineBadge from "./OfflineBadge";
import DetailsDialog from "./DetailsDialog";
import EditDialog from "./EditDialog";
import { cn } from "@/lib/utils";
import PowerButtons from "./PowerButtons";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const IsOnline = useMemo(() => {
    if (room.online === true) return <OnlineBadge />;
    return <OfflineBadge />;
  }, [room.online]);

  const [displayMotion, setDisplayMotion] = useState(room.motion);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (room.motion) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setDisplayMotion(true);

      timeoutRef.current = setTimeout(() => {
        setDisplayMotion(false);
      }, 60000);
    }
  }, [room.motion]);

  return (
    <Card
      className={cn(
        "w-full gap-10",
        displayMotion ? "shadow-[0px_0px_10px_5px_#48bb78]" : "" // #
      )}
    >
      <CardHeader>
        <CardTitle className="w-full flex justify-between items-center text-xl">
          {room.info.name} {IsOnline}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-10">
        <PowerButtons roomId={room.id} />
        <Slider
          value={[room.maxValue3b]}
          max={7}
          staticThumb={room.minValue3b}
          disabled={true}
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

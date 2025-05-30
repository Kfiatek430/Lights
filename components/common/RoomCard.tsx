import { Room } from "@/types/room";
import React, { FC, useMemo } from "react";
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
import { Button } from "../ui/button";
import { Lightbulb, LightbulbOff, Pointer } from "lucide-react";
import DetailsDialog from "./DetailsDialog";
import EditDialog from "./EditDialog";

interface RoomCardProps {
  room: Room;
}

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const IsOnline = useMemo(() => {
    if (room.onLine === true) return <OnlineBadge />;
    return <OfflineBadge />;
  }, [room.onLine]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="w-full flex justify-between items-center">
          {room.info.name} {IsOnline}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-10 py-5">
        <div className="w-full flex flex-col gap-3">
          <h4>Przyciski sterowania</h4>
          <div className="w-full flex flex-row justify-center gap-3 text-xs">
            <Button
              variant="destructive"
              className="flex-1 h-fit flex flex-col gap-2"
            >
              <LightbulbOff />
              <p>Wyłącz</p>
            </Button>
            <Button variant="blue" className="flex-1 h-fit flex flex-col gap-2">
              <Pointer />
              <p>Przyciski</p>
            </Button>
            <Button
              variant="success"
              className="flex-1 h-fit flex flex-col gap-2"
            >
              <Lightbulb />
              Włącz
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col items-end gap-3">
          <h4 className="w-full text-start">Pomiar Jasności</h4>
          <Slider value={[0]} max={7} className="w-[95%]" staticThumb={4} />
        </div>
      </CardContent>
      <CardFooter className="w-full flex flex-row justify-end items-end gap-3">
        <DetailsDialog room={room} />
        <EditDialog room={room} />
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

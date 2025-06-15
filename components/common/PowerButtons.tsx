import React from "react";
import { Button } from "../ui/button";
import { Lightbulb, LightbulbOff, Pointer } from "lucide-react";
import { useSetRoomValue } from "@/hooks/useSetRoomValue";
import { useSetFromButton } from "@/hooks/useSetRoomFromButton";

type PowerButtonsProps = {
  roomId: number;
};

const PowerButtons = ({ roomId }: PowerButtonsProps) => {
  const setRoomValue = useSetRoomValue();
  const setRoomFromButton = useSetFromButton();

  return (
    <div className="w-full flex flex-row justify-center gap-3 text-xs">
      <Button
        variant="destructive"
        className="flex-1 h-fit flex flex-col gap-2"
        onClick={() => setRoomValue.mutate({ roomId: roomId, value: 0 })}
      >
        <LightbulbOff />
        <p>Wyłącz</p>
      </Button>
      <Button
        variant="blue"
        className="flex-1 h-fit flex flex-col gap-2"
        onClick={() => setRoomFromButton.mutate({ roomId: roomId })}
      >
        <Pointer />
        <p>Przyciski</p>
      </Button>
      <Button
        variant="success"
        className="flex-1 h-fit flex flex-col gap-2"
        onClick={() => setRoomValue.mutate({ roomId: roomId, value: 6 })}
      >
        <Lightbulb />
        Włącz
      </Button>
    </div>
  );
};

export default PowerButtons;

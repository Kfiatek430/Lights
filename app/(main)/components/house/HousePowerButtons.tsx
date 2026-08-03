"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, LightbulbOff, Pointer } from "lucide-react";
import { useSetHouseValue } from "@/hooks/useSetHouseValue";
import { useSetHouseFromButton } from "@/hooks/useSetHouseFromButton";

const HousePowerButtons = () => {
  const setHouseValue = useSetHouseValue();
  const setHouseFromButton = useSetHouseFromButton();

  return (
    <div className="w-full flex flex-row justify-center gap-3 text-xs">
      <Button
        variant="destructive"
        className="flex-1 h-fit flex flex-col gap-2"
        onClick={() => setHouseValue.mutate({ value: 0 })}
      >
        <LightbulbOff />
        <p>Wyłącz</p>
      </Button>
      <Button
        variant="blue"
        className="flex-1 h-fit flex flex-col gap-2"
        onClick={() => setHouseFromButton.mutate()}
      >
        <Pointer />
        <p>Przyciski</p>
      </Button>
      <Button
        variant="success"
        className="flex-1 h-fit flex flex-col gap-2"
        onClick={() => setHouseValue.mutate({ value: 6 })}
      >
        <Lightbulb />
        Włącz
      </Button>
    </div>
  );
};

export default HousePowerButtons;

"use client";

import { FC, useEffect, useState } from "react";
import HousePowerButtons from "./HousePowerButtons";
import Slider from "@/components/ui/slider";
import { House } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BatteryWarning, Cable, Moon, Sun } from "lucide-react";
import { useSetHouseValue } from "@/hooks/useSetHouseValue";

type HouseManagerProps = {
  house: House;
};

const HouseManager: FC<HouseManagerProps> = ({ house }) => {
  const [maxValue3b, setMaxValue3b] = useState([house.maxValue3b]);
  const [minValue3b, setMinValue3b] = useState(house.minValue3b);
  const setHouseValue = useSetHouseValue();

  const handleMainValueChange = (newValues: number[]) => {
    setHouseValue.mutate({ value: newValues[0] });
    setMaxValue3b(newValues);
    setMinValue3b(newValues[0]);
  };

  useEffect(() => {
    setMinValue3b(house.minValue3b);
  }, [house.minValue3b]);

  useEffect(() => {
    setMaxValue3b([house.maxValue3b]);
  }, [house.maxValue3b]);

  return (
    <Card className="w-full gap-3 py-4">
      <CardHeader>
        <div className="flex flex-row justify-center items-center gap-3">
          <h1 className="font-bold text-2xl">Wiosenna</h1>
          <div className="flex flex-row items-center gap-2">
            <span title={house.twilight ? "Zmierzch" : "Dzień"}>
              {house.twilight ? (
                <Moon className="size-4 text-indigo-400" />
              ) : (
                <Sun className="size-4 text-amber-400" />
              )}
            </span>
            <span
              title={
                house.power === "Battery"
                  ? "Zasilanie awaryjne"
                  : "Zasilanie sieciowe"
              }
            >
              {house.power === "Battery" ? (
                <BatteryWarning className="size-4 text-red-500 animate-pulse" />
              ) : (
                <Cable className="size-4 text-emerald-500" />
              )}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <HousePowerButtons />
        <Slider
          value={maxValue3b}
          onValueChange={handleMainValueChange}
          max={7}
          staticThumb={minValue3b}
        />
      </CardContent>
    </Card>
  );
};

export default HouseManager;

"use client";

import { FC } from "react";
import HousePowerButtons from "./HousePowerButtons";
import Slider from "@/components/ui/slider";
import { House } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BatteryWarning, Cable, Moon, Sun } from "lucide-react";
import { useSetHouseValue } from "@/hooks/useSetHouseValue";
import { useSyncedState } from "@/hooks/useSyncedState";

type HouseManagerProps = {
  house: House;
};

const HouseManager: FC<HouseManagerProps> = ({ house }) => {
  const [maxValue3b, setMaxValue3b] = useSyncedState(house.maxValue3b);
  const [minValue3b, setMinValue3b] = useSyncedState(house.minValue3b);
  const setHouseValue = useSetHouseValue();

  const handleMainValueChange = (newValues: number[]) => {
    setHouseValue.mutate({ value: newValues[0] });
    setMaxValue3b(newValues[0]);
    setMinValue3b(newValues[0]);
  };

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
          value={[maxValue3b]}
          onValueChange={handleMainValueChange}
          max={7}
          staticThumb={minValue3b}
        />
      </CardContent>
    </Card>
  );
};

export default HouseManager;

"use client";

import { FC, useEffect, useState } from "react";
import HousePowerButtons from "./HousePowerButtons";
import Slider from "../ui/slider";
import { House } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";

type HouseManagerProps = {
  data: House;
};

const HouseManager: FC<HouseManagerProps> = ({ data }) => {
  const [maxValue3b, setMaxValue3b] = useState([data.maxValue3b]);
  const [minValue3b, setMinValue3b] = useState(data.minValue3b);

  const handleMainValueChange = (newValues: number[]) => {
    // TODO: changing values in server
    setMaxValue3b(newValues);
    setMinValue3b(newValues[0]);
  };

  useEffect(() => {
    setMinValue3b(data.minValue3b);
  }, [data.minValue3b]);

  useEffect(() => {
    setMaxValue3b([data.maxValue3b]);
  }, [data.maxValue3b]);

  return (
    <Card className="w-full md:w-1/2 lg:w-1/3">
      <CardHeader>
        <h1 className="flex justify-center font-bold text-2xl">Wiosenna</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
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

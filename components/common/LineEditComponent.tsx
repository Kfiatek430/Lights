import { Line } from "@/types/room";
import React, { FC, useEffect, useState } from "react";
import Slider from "../ui/slider";
import type { Mode } from "@/lib/constants";

interface LineEditComponentProps {
  line: Line;
  name: string;
  mode: Mode;
}

const LineEditComponent: FC<LineEditComponentProps> = ({
  line,
  name,
  mode,
}) => {
  const [value, setValue] = useState<number[]>([]);
  const [max, setMax] = useState<number>(7);

  useEffect(() => {
    switch (mode) {
      case "3b":
        setValue([line.value3b]);
        setMax(7);
        break;
      case "8b":
        setValue([line.value8b]);
        setMax(127);
        break;
      case "16b":
        setValue([line.value16b]);
        setMax(255);
        break;
    }
  }, [line, mode]);

  return (
    <div className="flex flex-row justify-between items-center w-full">
      <p>{name}</p>
      <Slider
        value={value}
        onValueChange={setValue}
        max={max}
        className="w-1/2"
      />
    </div>
  );
};

export default LineEditComponent;

import { Line } from "@/types/room";
import React, { FC } from "react";

interface LineComponentProps {
  line: Line;
  name: string;
}

const LineComponent: FC<LineComponentProps> = ({ line, name }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <p>{name}</p>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs">3b</p>
          <p className="font-bold">{line.value3b}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs">8b</p>
          <p className="font-bold">{line.value8b}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xs">16b</p>
          <p className="font-bold">{line.value16b}</p>
        </div>
      </div>
    </div>
  );
};

export default LineComponent;

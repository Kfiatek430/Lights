import { Line } from "@/types";
import React, { FC } from "react";

interface LineViewComponentProps {
  line: Line;
  name: string;
}

const LineViewComponent: FC<LineViewComponentProps> = ({ line, name }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <p>{name}</p>
      <div className="flex flex-row gap-2 w-1/2">
        <div className="flex flex-1 flex-col justify-center items-center">
          <p className="text-xs">3b</p>
          <p className="font-bold">{line.value3b}</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <p className="text-xs">8b</p>
          <p className="font-bold">{line.value8b}</p>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <p className="text-xs">16b</p>
          <p className="font-bold">{line.value16b}</p>
        </div>
      </div>
    </div>
  );
};

export default LineViewComponent;

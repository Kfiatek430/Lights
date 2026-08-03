import { Line } from "@/types";
import React, { FC } from "react";

interface LineViewComponentProps {
  line: Line;
  name: string;
}

const LineViewComponent: FC<LineViewComponentProps> = ({ line, name }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full gap-3">
      <p className="shrink-0">{name}</p>
      <div className="flex flex-row gap-3 shrink-0">
        <div className="flex w-8 flex-col justify-center items-center">
          <p className="text-xs text-muted-foreground">3b</p>
          <p className="font-bold">{line.value3b}</p>
        </div>
        <div className="flex w-8 flex-col justify-center items-center">
          <p className="text-xs text-muted-foreground">8b</p>
          <p className="font-bold">{line.value8b}</p>
        </div>
        <div className="flex w-8 flex-col justify-center items-center">
          <p className="text-xs text-muted-foreground">16b</p>
          <p className="font-bold">
            {line.value16b.toString(16).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineViewComponent;

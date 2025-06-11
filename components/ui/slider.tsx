"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  staticThumb?: number;
  disabled?: boolean;
}

export default function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  staticThumb,
  disabled,
}: SliderProps) {
  const handleValueChange = (newValues: number[]) => {
    onValueChange?.(newValues);
  };

  const staticThumbPosition =
    staticThumb !== undefined ? ((staticThumb - min) / (max - min)) * 100 : 0;

  return (
    <div
      className={cn("relative w-full flex flex-col items-center", className)}
    >
      <div className="h-5 w-full relative mb-2">
        <Badge
          className="absolute flex justify-center items-center"
          style={{
            left: `calc(${(value[0] / max) * 100}% - 13px)`,
            bottom: "0px",
          }}
        >
          <span>{value[0]}</span>
        </Badge>

        {staticThumb !== undefined && (
          <Badge
            className="absolute w-6 flex justify-center items-center"
            style={{
              left: `calc(${staticThumbPosition}% - 13px)`,
              bottom: "0px",
            }}
          >
            <span>{staticThumb}</span>
          </Badge>
        )}
      </div>

      <SliderPrimitive.Root
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
        className="relative flex w-full touch-none select-none items-center"
        disabled={disabled}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        <div
          className={cn(
            "absolute block h-4 w-4 rounded-full border border-primary/50 bg-background shadow pointer-events-auto z-10",
            disabled ? "" : "cursor-pointer"
          )}
          style={{
            left: `calc(${(value[0] / max) * 100}% - 9px)`,
          }}
        ></div>

        {staticThumb !== undefined && (
          <div
            className="absolute block h-4 w-4 rounded-full border border-primary/50 bg-background shadow pointer-events-none z-10"
            style={{
              left: `calc(${staticThumbPosition}% - 9px)`,
            }}
          ></div>
        )}
      </SliderPrimitive.Root>
    </div>
  );
}

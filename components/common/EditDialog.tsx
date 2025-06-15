"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";
import Slider from "../ui/slider";
import { FC, useEffect, useState } from "react";
import React from "react";
import { Room, Mode, Pattern } from "@/types";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import LineEditComponent from "./LineEditComponent";
import { Combobox } from "../ui/combobox";
import PowerButtons from "./PowerButtons";
import { useSetRoomValue } from "@/hooks/useSetRoomValue";
import { useSetRoomPattern } from "@/hooks/useSetRoomPattern";
import { PATTERNS } from "@/lib/constants";

interface EditDialogProps {
  room: Room;
}

const PATTERN_OPTIONS = PATTERNS.map((pattern) => ({
  value: pattern,
  label: pattern,
}));

const MODE_OPTIONS = [
  {
    value: "3b",
    label: "3-bit",
  },
  {
    value: "8b",
    label: "8-bit",
  },
  {
    value: "16b",
    label: "16-bit",
  },
] as const;

const EditDialog: FC<EditDialogProps> = ({ room }) => {
  const [maxValue3b, setMaxValue3b] = useState([room.maxValue3b]);
  const [minValue3b, setMinValue3b] = useState(room.minValue3b);
  const [mode, setMode] = useState<Mode>("3b");
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(
    PATTERNS[room.pattern]
  );

  const setRoomValue = useSetRoomValue();
  const setRoomPattern = useSetRoomPattern();

  const handleMainValueChange = (newValues: number[]) => {
    setRoomValue.mutate({ roomId: room.id, value: newValues[0] });
    setMaxValue3b(newValues);
    setMinValue3b(newValues[0]);
  };

  const handlePatternChange = (newPattern: Pattern) => {
    setSelectedPattern(newPattern);
    const patternIndex = PATTERNS.indexOf(newPattern);
    setRoomPattern.mutate({ roomId: room.id, patternId: patternIndex });
  };

  useEffect(() => {
    const roomPattern = PATTERNS[room.pattern];
    setSelectedPattern(roomPattern);
  }, [room.pattern]);

  useEffect(() => {
    setMinValue3b(room.minValue3b);
  }, [room.minValue3b]);

  useEffect(() => {
    setMaxValue3b([room.maxValue3b]);
  }, [room.maxValue3b]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edytuj</Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[95%] flex flex-col overflow-y-auto max-w-[95%] lg:max-w-5xl"
      >
        <DialogHeader className="-mt-3 -mx-6 border-b pb-3 px-6 flex flex-row justify-between items-center">
          <DialogTitle className="text-xl">{room.info.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Edycja ustawień pokoju {room.info.name}
          </DialogDescription>
          <DialogPrimitive.Close
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              }),
              "cursor-pointer"
            )}
          >
            <X />
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-12 px-6">
          <div className="w-full lg:w-1/3 min-h-full flex flex-col gap-4 lg:gap-8">
            <PowerButtons roomId={room.id} />
            <Separator />
            <Slider
              value={maxValue3b}
              onValueChange={handleMainValueChange}
              max={7}
              staticThumb={minValue3b}
            />
            <Separator />
            <div className="flex justify-center items-center">
              <Combobox
                value={selectedPattern}
                setValue={handlePatternChange}
                values={PATTERN_OPTIONS}
                searchLabel="Search pattern..."
                notFoundLabel="Pattern not found."
              />
            </div>
          </div>

          <Separator className="lg:hidden" />

          <div className="w-full lg:w-2/3 flex flex-col items-center gap-3">
            <Combobox
              value={mode}
              setValue={setMode}
              values={MODE_OPTIONS}
              searchLabel="Search mode..."
              notFoundLabel="Mode not found."
            />
            <div className="w-full flex flex-col justify-center items-center gap-3 lg:gap-4">
              {room.lines.map((line, index) => (
                <React.Fragment key={index}>
                  <LineEditComponent
                    roomId={room.id}
                    line={line}
                    name={room.info.lineNames[index]}
                    mode={mode}
                  />
                  <Separator />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;

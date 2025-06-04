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
import { Lightbulb, LightbulbOff, Pointer, X } from "lucide-react";
import Slider from "../ui/slider";
import { FC } from "react";
import React from "react";
import { Room } from "@/types/room";
import { Separator } from "@/components/ui/separator";
import LineViewComponent from "./LineViewComponent";
import { cn } from "@/lib/utils";
import { PATTERNS } from "@/lib/constants";

interface DetailsDialogProps {
  room: Room;
}

const DetailsDialog: FC<DetailsDialogProps> = ({ room }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Szczegóły</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="-mt-3 -mx-6 border-b pb-3 px-6 flex flex-row justify-between items-center">
          <DialogTitle className="text-xl">{room.info.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Szczegóły pokoju {room.info.name}
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

        <div className="flex flex-col justify-center items-center gap-8">
          <div className="w-full flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Przyciski sterowania</h4>
            <div className="w-full flex flex-row justify-center gap-3 text-xs">
              <Button
                variant="destructive"
                className="flex-1 h-fit flex flex-col gap-2"
              >
                <LightbulbOff />
                <p>Wyłącz</p>
              </Button>
              <Button
                variant="blue"
                className="flex-1 h-fit flex flex-col gap-2"
              >
                <Pointer />
                <p>Przyciski</p>
              </Button>
              <Button
                variant="success"
                className="flex-1 h-fit flex flex-col gap-2"
              >
                <Lightbulb />
                Włącz
              </Button>
            </div>
          </div>
          <Separator />
          <div className="w-full flex flex-col items-end gap-3">
            <h4 className="w-full text-start font-semibold text-lg">
              Pomiar Jasności
            </h4>
            <Slider
              value={[room.maxValue3b]}
              max={7}
              staticThumb={room.minValue3b}
              disabled={true}
            />
          </div>
          <Separator />
          <div className="w-full flex flex-row gap-2">
            <h4 className="font-semibold text-lg">Wzorzec oświetlenia:</h4>
            <p className="text-lg">{PATTERNS[room.pattern]}</p>
          </div>
          <Separator />
          <div className="w-full flex flex-col gap-3">
            <h4 className="font-semibold text-lg">Punkty świetlne</h4>
            <div className="w-full flex flex-col justify-center items-center gap-3">
              {room.lines.map((line, index) => (
                <React.Fragment key={index}>
                  <LineViewComponent
                    line={line}
                    name={room.info.lineNames[index]}
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

export default DetailsDialog;

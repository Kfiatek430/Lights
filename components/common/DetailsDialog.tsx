import {
  Dialog,
  DialogContent,
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
import LineComponent from "./LineComponent";

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
        <DialogHeader className="-mt-3 -mx-6 border-b pb-3 px-6 flex flex-row justify-between items-center bg-sidebar">
          <DialogTitle>{room.info.name}</DialogTitle>
          <DialogPrimitive.Close
            className={buttonVariants({
              variant: "outline",
              size: "icon",
            })}
          >
            <X />
          </DialogPrimitive.Close>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center gap-8">
          <div className="w-full flex flex-row justify-center gap-3 text-xs">
            <Button
              variant="destructive"
              className="flex-1 h-fit flex flex-col gap-2"
            >
              <LightbulbOff />
              <p>Wyłącz</p>
            </Button>
            <Button variant="blue" className="flex-1 h-fit flex flex-col gap-2">
              <Pointer />
              <p>Przyciski</p>
            </Button>
            <Button
              variant="success"
              className="flex-1 h-fit flex flex-col gap-2"
            >
              <Lightbulb />
              Włącz
            </Button>{" "}
          </div>
          <Slider
            value={[0]}
            max={7}
            className="w-full mt-4"
            staticThumb={4}
          />{" "}
          <div className="w-full flex flex-col justify-center items-center gap-3">
            {room.lines.map((line, index) => (
              <React.Fragment key={index}>
                <LineComponent line={line} name={room.info.lineNames[index]} />
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;

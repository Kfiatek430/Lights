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
import { Badge } from "@/components/ui/badge";
import Slider from "@/components/ui/slider";
import { FC } from "react";
import React from "react";
import { Room } from "@/types";
import { Separator } from "@/components/ui/separator";
import LineViewComponent from "./LineViewComponent";
import { cn } from "@/lib/utils";
import { PATTERNS } from "@/lib/constants";
import RoomPowerButtons from "./RoomPowerButtons";
import MotionSensors from "./MotionSensors";

interface DetailsDialogProps {
  room: Room;
}

const DetailsDialog: FC<DetailsDialogProps> = ({ room }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Szczegóły</Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[95%] flex flex-col overflow-y-auto max-w-[95%] lg:max-w-5xl"
      >
        <DialogHeader className="-mt-3 -mx-6 border-b pb-3 px-6 flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <DialogTitle className="text-xl">{room.info.name}</DialogTitle>
            <Badge variant="secondary">{PATTERNS[room.pattern]}</Badge>
          </div>
          <DialogDescription className="sr-only">
            Szczegóły pokoju {room.info.name}
          </DialogDescription>
          <DialogPrimitive.Close
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              }),
              "cursor-pointer",
            )}
          >
            <X />
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-12 px-6">
          <div className="w-full lg:w-1/3 min-h-full flex flex-col gap-4">
            <RoomPowerButtons roomId={room.id} />
            <MotionSensors room={room} variant="compact" />
            <Slider
              value={[room.maxValue3b]}
              max={7}
              staticThumb={room.minValue3b}
              disabled={true}
            />
          </div>

          <Separator className="lg:hidden" />

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;

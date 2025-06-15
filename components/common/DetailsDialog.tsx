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
import { Room } from "@/types";
import { Separator } from "@/components/ui/separator";
import LineViewComponent from "./LineViewComponent";
import { cn } from "@/lib/utils";
import { PATTERNS } from "@/lib/constants";
import PowerButtons from "./PowerButtons";

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
        <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-12 px-6">
          <div className="w-full lg:w-1/3 min-h-full flex flex-col gap-4 lg:gap-8">
            <PowerButtons roomId={room.id} />
            <Separator />
            <Slider
              value={[room.maxValue3b]}
              max={7}
              staticThumb={room.minValue3b}
              disabled={true}
            />
            <Separator />
            <div className="w-full flex flex-row gap-2">
              <h4 className="font-semibold text-lg">Wzorzec oświetlenia:</h4>
              <p className="text-lg">{PATTERNS[room.pattern]}</p>
            </div>
          </div>

          <Separator className="lg:hidden" />

          <div className="w-full lg:w-2/3 flex flex-col justify-center items-center gap-3 lg:gap-4">
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

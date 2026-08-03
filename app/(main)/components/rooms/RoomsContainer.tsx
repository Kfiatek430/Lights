import RoomCard from "./RoomCard";
import { Room } from "@/types";
import { forwardRef } from "react";

const RoomsContainer = forwardRef<HTMLDivElement, { rooms: Room[] }>(
  ({ rooms }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 h-fit justify-items-center"
      >
        {rooms.map((room: Room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    );
  },
);

RoomsContainer.displayName = "RoomsContainer";

export default RoomsContainer;

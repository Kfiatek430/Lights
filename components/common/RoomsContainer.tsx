"use client";

import RoomCard from "@/components/common/RoomCard";
import { useHouseWebSocket } from "@/hooks/useHouseWebSocket";
import { mergeObjects } from "@/lib/utils";
import { House, Room } from "@/types";
import { useState } from "react";

const RoomsContainer = ({ data }: { data: House }) => {
  const [house, setHouse] = useState<House>(data);

  useHouseWebSocket((updatedData: House) => {
    setHouse(mergeObjects(updatedData, house));
  });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 h-fit justify-items-center">
      {house.rooms.map((room: Room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomsContainer;

import RoomCard from "@/components/common/RoomCard";
import { Room } from "@/types/room";

export default function Home() {
  const lazienka: Room = {
    id: 1,
    onLine: true,
    info: {
      name: "Łazienka parter",
      chips: 1,
      lines: 4,
      patterns: 4,
      values3b: 8,
      patternNames: ["Zimny", "Neutralny", "Ciepły", "Relaks"],
      lineNames: [
        "Góra<br>zimne",
        "Góra<br>ciepłe",
        "Lustro<br>zimne",
        "Lustro<br>ciepłe",
      ],
    },
    motion: false,
    motionValue: 0,
    motionChangeTimestamp: 1748446764011,
    pattern: 0,
    minValue3b: 1,
    maxValue3b: 5,
    minValue3bReq: 0,
    maxValue3bReq: 0,
    lines: [
      {
        id: 0,
        value3bReq: 0,
        value3b: 1,
        value8b: 10,
        value16b: 100,
      },
      {
        id: 1,
        value3bReq: 0,
        value3b: 0,
        value8b: 2,
        value16b: 2,
      },
      {
        id: 2,
        value3bReq: 0,
        value3b: 0,
        value8b: 0,
        value16b: 0,
      },
      {
        id: 3,
        value3bReq: 0,
        value3b: 0,
        value8b: 2,
        value16b: 2,
      },
    ],
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 h-fit justify-items-center">
      <RoomCard key={lazienka.id} room={lazienka} />
    </div>
  );
}

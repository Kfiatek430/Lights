import HouseManager from "@/components/common/HouseManager";
import RoomsContainer from "@/components/common/RoomsContainer";
import { Separator } from "@/components/ui/separator";
import { SERVER_URL } from "@/lib/constants";
import { House } from "@/types";

export default async function Home() {
  // const data: House = {
  //   maxValue3b: 7,
  //   minValue3b: 0,
  //   name: "Dom Przykładowy",
  //   timestamp: Date.now(),
  //   twilight: false,
  //   uartBaudRate: "115200",
  //   uartStatus: "OK",
  //   rooms: [
  //     {
  //       id: 1,
  //       online: true,
  //       info: {
  //         name: "Salon",
  //         chips: 4,
  //         lines: 8,
  //         patterns: 4,
  //         values3b: 8,
  //         patternNames: ["Zimny", "Neutralny", "Ciepły", "Relaks"],
  //         lineNames: [
  //           "Linia 1",
  //           "Linia 2",
  //           "Linia 3",
  //           "Linia 4",
  //           "Linia 5",
  //           "Linia 6",
  //           "Linia 7",
  //           "Linia 8",
  //         ],
  //       },
  //       motion: true,
  //       motionValue: 3,
  //       motionChangeTimestamp: Date.now() - 30000,
  //       pattern: 1,
  //       minValue3b: 0,
  //       maxValue3b: 7,
  //       minValue3bReq: 0,
  //       maxValue3bReq: 7,
  //       lines: [
  //         { id: 1, value3bReq: 4, value3b: 3, value8b: 120, value16b: 30000 },
  //         { id: 2, value3bReq: 5, value3b: 4, value8b: 140, value16b: 35000 },
  //         { id: 3, value3bReq: 3, value3b: 3, value8b: 100, value16b: 25000 },
  //         { id: 4, value3bReq: 6, value3b: 5, value8b: 160, value16b: 40000 },
  //         { id: 5, value3bReq: 2, value3b: 2, value8b: 80, value16b: 20000 },
  //         { id: 6, value3bReq: 4, value3b: 4, value8b: 130, value16b: 32000 },
  //         { id: 7, value3bReq: 5, value3b: 4, value8b: 150, value16b: 38000 },
  //         { id: 8, value3bReq: 3, value3b: 3, value8b: 110, value16b: 28000 },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       online: true,
  //       info: {
  //         name: "Kuchnia",
  //         chips: 2,
  //         lines: 4,
  //         patterns: 4,
  //         values3b: 8,
  //         patternNames: ["Zimny", "Neutralny", "Ciepły", "Relaks"],
  //         lineNames: ["Linia 1", "Linia 2", "Linia 3", "Linia 4"],
  //       },
  //       motion: false,
  //       motionValue: 1,
  //       motionChangeTimestamp: Date.now() - 120000,
  //       pattern: 2,
  //       minValue3b: 0,
  //       maxValue3b: 7,
  //       minValue3bReq: 0,
  //       maxValue3bReq: 7,
  //       lines: [
  //         { id: 1, value3bReq: 6, value3b: 5, value8b: 180, value16b: 45000 },
  //         { id: 2, value3bReq: 4, value3b: 4, value8b: 125, value16b: 31000 },
  //         { id: 3, value3bReq: 5, value3b: 5, value8b: 155, value16b: 39000 },
  //         { id: 4, value3bReq: 3, value3b: 3, value8b: 95, value16b: 24000 },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       online: false,
  //       info: {
  //         name: "Sypialnia",
  //         chips: 3,
  //         lines: 6,
  //         patterns: 4,
  //         values3b: 8,
  //         patternNames: ["Zimny", "Neutralny", "Ciepły", "Relaks"],
  //         lineNames: [
  //           "Linia 1",
  //           "Linia 2",
  //           "Linia 3",
  //           "Linia 4",
  //           "Linia 5",
  //           "Linia 6",
  //         ],
  //       },
  //       motion: false,
  //       motionValue: 0,
  //       motionChangeTimestamp: Date.now() - 300000,
  //       pattern: 0,
  //       minValue3b: 0,
  //       maxValue3b: 7,
  //       minValue3bReq: 0,
  //       maxValue3bReq: 7,
  //       lines: [
  //         { id: 1, value3bReq: 2, value3b: 1, value8b: 60, value16b: 15000 },
  //         { id: 2, value3bReq: 3, value3b: 2, value8b: 75, value16b: 19000 },
  //         { id: 3, value3bReq: 1, value3b: 1, value8b: 40, value16b: 10000 },
  //         { id: 4, value3bReq: 4, value3b: 3, value8b: 105, value16b: 26000 },
  //         { id: 5, value3bReq: 2, value3b: 2, value8b: 65, value16b: 16000 },
  //         { id: 6, value3bReq: 3, value3b: 2, value8b: 85, value16b: 21000 },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       online: true,
  //       info: {
  //         name: "Łazienka",
  //         chips: 1,
  //         lines: 2,
  //         patterns: 4,
  //         values3b: 8,
  //         patternNames: ["Zimny", "Neutralny", "Ciepły", "Relaks"],
  //         lineNames: ["Linia 1", "Linia 2"],
  //       },
  //       motion: true,
  //       motionValue: 5,
  //       motionChangeTimestamp: Date.now() - 15000,
  //       pattern: 3,
  //       minValue3b: 0,
  //       maxValue3b: 7,
  //       minValue3bReq: 0,
  //       maxValue3bReq: 7,
  //       lines: [
  //         { id: 1, value3bReq: 7, value3b: 6, value8b: 200, value16b: 50000 },
  //         { id: 2, value3bReq: 6, value3b: 6, value8b: 190, value16b: 48000 },
  //       ],
  //     },
  //   ],
  // };
  const res = await fetch(`${SERVER_URL}/house/details?timestamp=0&withInfo=Y`);
  const data: House = await res.json();

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <HouseManager data={data} />
      <Separator />
      <RoomsContainer data={data} />
    </div>
  );
}

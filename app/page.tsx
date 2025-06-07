import RoomsContainer from "@/components/common/RoomsContainer";
import { House } from "@/types";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/house/details?timestamp=0&withInfo=Y`
  );
  const data: House = await res.json();
  return <RoomsContainer data={data} />;
}

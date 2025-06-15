import RoomsContainer from "@/components/common/RoomsContainer";
import { SERVER_URL } from "@/lib/constants";
import { House } from "@/types";

export default async function Home() {
  const res = await fetch(`${SERVER_URL}/house/details?timestamp=0&withInfo=Y`);
  const data: House = await res.json();
  return <RoomsContainer data={data} />;
}

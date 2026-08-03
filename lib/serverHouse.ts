import axios from "axios";
import { cookies } from "next/headers";
import { SERVER_URL } from "@/lib/constants";
import { House } from "@/types";

export async function fetchHouseServer(): Promise<House | null> {
  const token = (await cookies()).get("token")?.value;

  try {
    const { data } = await axios.get<House>(`${SERVER_URL}/house/details`, {
      params: { timestamp: 0, withInfo: "Y" },
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error;
  }
}

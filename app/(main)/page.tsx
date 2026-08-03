import HouseDashboard from "./components/HouseDashboard";
import { houseQueryKey } from "@/hooks/useHouseData";
import { fetchHouseServer } from "@/lib/serverHouse";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function Home() {
  const house = await fetchHouseServer();

  if (!house) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [houseQueryKey],
    queryFn: async () => house,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-5 w-full items-center">
        <HouseDashboard />
      </div>
    </HydrationBoundary>
  );
}

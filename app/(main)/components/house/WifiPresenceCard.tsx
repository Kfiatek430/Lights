import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { House } from "@/types";
import { FC } from "react";
import { cn } from "@/lib/utils";
import OnlineBadge from "../badges/OnlineBadge";
import OfflineBadge from "../badges/OfflineBadge";

type WifiPresenceCardProps = {
  house: House;
};

const WifiPresenceCard: FC<WifiPresenceCardProps> = ({ house }) => {
  const devices = house.wifiDevices ?? [];
  if (devices.length === 0) return null;

  const sorted = devices
    .map((device, idx) => ({
      device,
      online: house.wifiStatus?.[idx] ?? false,
    }))
    .sort((a, b) => Number(b.online) - Number(a.online));

  return (
    <Card className="w-full gap-3 py-4">
      <CardHeader>
        <CardTitle className="text-lg">W domu</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5">
        {sorted.map(({ device, online }) => (
          <div
            key={device.id}
            className="w-full flex flex-row items-center justify-between gap-2 py-0.5"
          >
            <span
              className={cn(
                "text-sm truncate",
                online ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {device.name}
            </span>
            {online ? <OnlineBadge /> : <OfflineBadge />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WifiPresenceCard;

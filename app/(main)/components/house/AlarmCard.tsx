"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { House } from "@/types";
import { useSetAlarmState } from "@/hooks/useSetAlarmState";
import { Lock, ShieldAlert, Unlock } from "lucide-react";
import { FC } from "react";

type AlarmCardProps = {
  house: House;
};

const AlarmCard: FC<AlarmCardProps> = ({ house }) => {
  const setAlarmState = useSetAlarmState();
  const isArmed = house.alarmState !== "OFF";

  const stateBadge =
    house.alarmState === "ARMED_ACTIVE" ? (
      <Badge className="bg-red-600/10 dark:bg-red-600/20 text-red-500 shadow-none rounded-full">
        Alarm!
      </Badge>
    ) : house.alarmState === "ARMED_IDLE" ? (
      <Badge className="bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 shadow-none rounded-full">
        Uzbrojony
      </Badge>
    ) : (
      <Badge className="bg-muted text-muted-foreground shadow-none rounded-full">
        Wyłączony
      </Badge>
    );

  return (
    <Card className="w-full gap-3 py-4">
      <CardHeader>
        <CardTitle className="w-full flex justify-between items-center text-lg">
          Alarm
          {stateBadge}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-3">
        <Button
          variant={isArmed ? "secondary" : "blue"}
          className="flex-1"
          onClick={() => setAlarmState.mutate({ value: isArmed ? 0 : 1 })}
        >
          {isArmed ? <Unlock /> : <Lock />}
          {isArmed ? "Rozbrój" : "Uzbrój"}
        </Button>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => setAlarmState.mutate({ value: 2 })}
          title="Ręczne uruchomienie alarmu"
        >
          <ShieldAlert />
          Alarm ręczny
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlarmCard;

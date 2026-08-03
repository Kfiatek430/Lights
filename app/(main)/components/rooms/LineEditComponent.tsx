import { Line, Mode } from "@/types";
import { FC } from "react";
import Slider from "@/components/ui/slider";
import { useSetLineValue } from "@/hooks/useSetLineValue";
import { useSyncedState } from "@/hooks/useSyncedState";

interface LineEditComponentProps {
  roomId: number;
  line: Line;
  name: string;
  mode: Mode;
}

const MAX_BY_MODE: Record<Mode, number> = {
  "3b": 7,
  "8b": 255,
  "16b": 65535,
};

function valueForMode(line: Line, mode: Mode) {
  switch (mode) {
    case "3b":
      return line.value3b;
    case "8b":
      return line.value8b;
    case "16b":
      return line.value16b;
  }
}

const LineEditComponent: FC<LineEditComponentProps> = ({
  roomId,
  line,
  name,
  mode,
}) => {
  const [value, setValue] = useSyncedState(valueForMode(line, mode));
  const max = MAX_BY_MODE[mode];

  const setLineValue = useSetLineValue();

  const handleChangeValue = (newValue: number[]) => {
    setLineValue.mutate({
      roomId: roomId,
      lineId: line.id,
      mode: mode,
      value: newValue[0],
    });
    setValue(newValue[0]);
  };

  return (
    <div className="flex flex-row justify-end items-end w-full relative">
      <p className="absolute left-0 -bottom-2">{name}</p>
      <Slider
        value={[value]}
        onValueChange={handleChangeValue}
        max={max}
        mode={mode}
        className="w-1/2"
      />
    </div>
  );
};

export default LineEditComponent;

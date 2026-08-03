import { useState, Dispatch, SetStateAction } from "react";

export function useSyncedState<T>(
  propValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [prevPropValue, setPrevPropValue] = useState(propValue);
  const [value, setValue] = useState(propValue);

  if (propValue !== prevPropValue) {
    setPrevPropValue(propValue);
    setValue(propValue);
  }

  return [value, setValue];
}

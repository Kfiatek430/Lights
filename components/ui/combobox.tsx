"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface ComboboxValue<T extends string> {
  readonly value: T;
  readonly label: string;
}

export function Combobox<T extends string>({
  value,
  setValue,
  values,
  searchLabel,
  notFoundLabel,
}: {
  value: T;
  setValue: (value: T) => void;
  values: readonly ComboboxValue<T>[];
  searchLabel: string;
  notFoundLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? values.find((it) => it.value === value)?.label : searchLabel}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchLabel} className="h-9" />
          <CommandList>
            <CommandEmpty>{notFoundLabel}</CommandEmpty>
            <CommandGroup>
              {values.map((it) => (
                <CommandItem
                  key={it.value}
                  value={it.value}
                  onSelect={(currentValue) => {
                    const selectedValue = values.find(
                      (val) => val.value === currentValue
                    )?.value;
                    setValue(
                      selectedValue === value
                        ? values[0]?.value
                        : selectedValue!
                    );
                    setOpen(false);
                  }}
                >
                  {it.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === it.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

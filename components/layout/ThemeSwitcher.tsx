"use client";

import { Button } from "@/components/ui/button";
import { useThemeMode, ThemeMode } from "@/hooks/useThemeMode";
import { Sun, Moon, SunMoon } from "lucide-react";

const NEXT_MODE: Record<ThemeMode, ThemeMode> = {
  light: "dark",
  dark: "auto",
  auto: "light",
};

const MODE_LABEL: Record<ThemeMode, string> = {
  light: "Jasny",
  dark: "Ciemny",
  auto: "Automatyczny",
};

const ThemeSwitcher = ({ className }: { className: string }) => {
  const { mode, setMode } = useThemeMode();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setMode(NEXT_MODE[mode])}
      className={className}
      title={`Motyw: ${MODE_LABEL[mode]}`}
    >
      {mode === "light" && <Sun className="h-4 w-4" />}
      {mode === "dark" && <Moon className="h-4 w-4" />}
      {mode === "auto" && <SunMoon className="h-4 w-4" />}
      <span className="sr-only">Przełącz motyw ({MODE_LABEL[mode]})</span>
    </Button>
  );
};

export default ThemeSwitcher;

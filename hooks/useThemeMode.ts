"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useHouseQuery } from "@/hooks/useHouseData";

export type ThemeMode = "light" | "dark" | "auto";

const STORAGE_KEY = "theme-mode";

export const useThemeMode = () => {
  const { setTheme } = useTheme();
  const { data: house } = useHouseQuery();
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "auto") {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (mode !== "auto") {
      setTheme(mode);
      return;
    }

    if (house === undefined) return;
    setTheme(house.twilight ? "dark" : "light");
  }, [mode, mounted, house, setTheme]);

  const setMode = useCallback((next: ThemeMode) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setModeState(next);
  }, []);

  return { mode, setMode, mounted };
};

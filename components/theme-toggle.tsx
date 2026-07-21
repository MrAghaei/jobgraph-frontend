"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
      title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

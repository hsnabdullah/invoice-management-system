"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#141624";
    } else {
      document.body.style.backgroundColor = "#F9F9FB";
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex z-50 items-center justify-center rounded-full text-[#7E88C3] dark:text-[#7E88C3] transition-all"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 transition-transform duration-300" />
      ) : (
        <Moon className="w-6 h-6 transition-transform duration-300" />
      )}
    </button>
  );
}

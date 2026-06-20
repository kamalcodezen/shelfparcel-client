"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 rounded-xl border p-1">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
          theme === "light" ? "bg-green-500 text-white" : ""
        }`}
      >
        <Sun size={16} />
        <span>Light</span>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
          theme === "dark" ? "bg-green-500 text-white" : ""
        }`}
      >
        <Moon size={16} />
        <span>Dark</span>
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
          theme === "system" ? "bg-green-500 text-white" : ""
        }`}
      >
        <Monitor size={16} />
        <span>System</span>
      </button>
    </div>
  );
}

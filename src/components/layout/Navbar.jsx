"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <nav className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          ShelfParcel
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>

          <Link href="/books" className="hover:text-primary">
            Books
          </Link>

          <Link href="/dashboard" className="hover:text-primary">
            Dashboard
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}

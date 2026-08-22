"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      className="relative flex h-9 w-9 items-center justify-center rounded border border-line text-ink-muted transition-colors duration-200 ease-signal hover:border-amber/50 hover:text-amber"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex"
        >
          {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/constants";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded border border-line"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
          className="h-px w-4 bg-ink"
        />
        <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-px w-4 bg-ink" />
        <motion.span
          animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
          className="h-px w-4 bg-ink"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-base"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-mono text-sm text-ink-muted hover:text-amber"
                  >
                    ~/{item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

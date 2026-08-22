"use client";

import { NAV_ITEMS } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

export function Nav() {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-7">
        {NAV_ITEMS.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = id === activeId;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "font-mono text-xs tracking-wide transition-colors duration-200 ease-signal hover:text-amber",
                  isActive ? "text-amber" : "text-ink-muted"
                )}
              >
                ~/{item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

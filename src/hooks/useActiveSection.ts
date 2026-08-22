"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most visible
 * in the viewport, so navigation can highlight where the reader
 * actually is instead of only responding to hover.
 *
 * rootMargin biases toward the upper third of the viewport, so a
 * section is considered "active" once it's the one sitting under
 * the sticky header rather than only once it's fully centered.
 */
export function useActiveSection(
  ids: string[]
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(
        (element): element is HTMLElement =>
          element !== null
      );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          );

        if (visible.length === 0) {
          return;
        }

        const firstVisible = visible[0];

        if (!firstVisible) {
          return;
        }

        setActiveId(firstVisible.target.id);
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };

    // Depend on the joined string, not the array reference,
    // so this doesn't re-run every render if the caller passes
    // a fresh array literal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return activeId;
}

import type { Variants } from "framer-motion";

/**
 * Centralized motion language for the whole site.
 * Signal's animation direction is "instrument, not ornament": short,
 * physical, purposeful movement — never bouncy, never decorative.
 */

export const EASE_SIGNAL = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SIGNAL },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_SIGNAL } },
};

/** Stagger wrapper for lists of cards/rows revealing on scroll. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Default viewport config for scroll-triggered reveals — fires once, slightly before full entry. */
export const scrollViewport = { once: true, margin: "-80px 0px -80px 0px" } as const;

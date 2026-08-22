"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { now } from "@/content/now";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

export function Now() {
  // Optional section — stays absent entirely rather than showing an empty-state
  // scaffold note, since it's not core to the portfolio's function.
  if (now.length === 0) return null;

  return (
    <Section id="now" heading="Now" intro="What's currently on the bench.">
      <motion.ul
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {now.map((item) => (
          <motion.li
            key={item.label}
            variants={fadeUp}
            className="rounded-md border border-line p-4 transition-all duration-300 ease-signal hover:-translate-y-1 hover:border-amber/50 hover:shadow-[0_20px_45px_-28px_rgba(232,163,61,0.45)] focus-within:-translate-y-1 focus-within:border-amber/60"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-teal">{item.label}</p>
            <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

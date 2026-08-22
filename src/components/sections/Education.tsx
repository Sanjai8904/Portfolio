"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { education } from "@/content/education";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

export function Education() {
  if (education.length === 0) {
    return (
      <Section id="education" heading="Education">
        <EmptyState file="src/content/education.ts" />
      </Section>
    );
  }

  return (
    <Section id="education" heading="Education">
      <motion.ol
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="relative border-l border-line pl-8"
      >
        {education.map((item) => (
          <motion.li
            key={`${item.institution}-${item.start}`}
            variants={fadeUp}
            className="relative pb-2 last:pb-0"
          >
            <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2 w-2 rounded-full bg-amber" />
            <p className="font-mono text-xs text-ink-faint">
              {item.start} — {item.end}
            </p>
            <h3 className="mt-1 font-display text-lg text-ink">{item.degree}</h3>
            <p className="mt-1 text-sm text-ink-muted">{item.institution}</p>
            <p className="mt-0.5 text-xs text-ink-faint">{item.university}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

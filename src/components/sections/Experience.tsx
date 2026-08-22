"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { experience } from "@/content/experience";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

export function Experience() {
  if (experience.length === 0) {
    return (
      <Section id="experience" heading="Experience">
        <EmptyState file="src/content/experience.ts" />
      </Section>
    );
  }

  return (
    <Section id="experience" heading="Experience">
      <motion.ol
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="relative border-l border-line pl-8"
      >
        {experience.map((item) => (
          <motion.li key={`${item.org}-${item.start}`} variants={fadeUp} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 h-2 w-2 rounded-full bg-amber" />
            <p className="font-mono text-xs text-ink-faint">
              {item.start} — {item.end}
            </p>
            <h3 className="mt-1 font-display text-lg text-ink">
              {item.role} <span className="text-ink-muted">· {item.org}</span>
            </h3>
            <p className="mt-0.5 text-xs text-ink-faint">{item.location}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{item.summary}</p>
            {item.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

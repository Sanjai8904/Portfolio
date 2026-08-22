"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { EmptyState } from "@/components/ui/EmptyState";
import { about } from "@/content/about";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

export function About() {
  const hasContent = about.paragraphs.length > 0;

  return (
    <Section id="about" heading="About">
      {!hasContent ? (
        <EmptyState file="src/content/about.ts" />
      ) : (
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="grid gap-12 md:grid-cols-[1.2fr_1fr]"
        >
          {/* Left: introduction — first line leads, rest supports */}
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-ink"
                    : "leading-relaxed text-ink-muted"
                }
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Right: capability areas as distinct, numbered cards */}
          <div className="space-y-4">
            {about.focusAreas.map((area, i) => (
              <motion.div key={area.title} variants={fadeUp}>
                <Panel interactive className="h-full">
                  <span className="font-mono text-xs text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-base text-ink">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {area.description}
                  </p>
                </Panel>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </Section>
  );
}

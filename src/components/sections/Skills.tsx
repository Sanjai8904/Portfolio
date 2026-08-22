"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Tag } from "@/components/ui/Tag";
import { EmptyState } from "@/components/ui/EmptyState";
import { skills } from "@/content/skills";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

export function Skills() {
  if (skills.length === 0) {
    return (
      <Section id="skills" heading="Stack">
        <EmptyState file="src/content/skills.ts" />
      </Section>
    );
  }

  return (
    <Section
      id="skills"
      heading="Stack"
      intro="Grouped by what it's for, not ranked by a made-up percentage."
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-5 sm:grid-cols-2"
      >
        {skills.map((group, i) => (
          <motion.div key={group.domain} variants={fadeUp}>
            <Panel interactive className="h-full">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                  {group.domain}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </Panel>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

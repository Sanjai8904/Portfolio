"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { writing } from "@/content/writing";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

export function Writing() {
  if (writing.length === 0) return null;

  return (
    <Section id="writing" heading="Writing" intro="Notes on things I had to think hard about.">
      <motion.ul
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="divide-y divide-line border-y border-line"
      >
        {writing.map((post) => (
          <motion.li key={post.slug} variants={fadeUp}>
            <a
              href={post.href}
              className="group flex items-center justify-between gap-4 py-5 transition-colors duration-200 ease-signal hover:text-amber"
            >
              <div>
                <h3 className="font-display text-base text-ink group-hover:text-amber">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{post.excerpt}</p>
                <p className="mt-2 font-mono text-[11px] text-ink-faint">
                  {post.date} · {post.readMinutes} min read
                </p>
              </div>
              <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-ink-faint group-hover:text-amber" />
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}

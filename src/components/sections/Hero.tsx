"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SignalWaveform } from "@/components/ui/SignalWaveform";
import { site } from "@/content/site";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Fixed Hero copy per design brief — not sourced from site.ts.
 * Role, location, and resumeUrl still read from site.ts since those
 * values already match the required copy exactly (role renders
 * uppercase via CSS, so "Software Engineer · Data Analyst" already
 * displays as "SOFTWARE ENGINEER · DATA ANALYST"), and the resume
 * link must always come from the real configured URL, never invented.
 */
const HERO_NAME = "Sanjai S.";
const HERO_TAGLINE =
  "I build reliable software systems and turn complex data into actionable insights.";
const HERO_AVAILABILITY_LABEL = "OPEN TO OPPORTUNITIES";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid bg-grid-cell bg-[position:center] pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* faint radial fade so the grid doesn't compete with text — unchanged */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(var(--c-base))_75%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* 1. Name — largest, most prominent */}
          <motion.h1 variants={fadeUp} className="font-display text-display-xl text-ink">
            {HERO_NAME}
          </motion.h1>

          {/* 2. Role */}
          <motion.p
            variants={fadeUp}
            className="mt-3 font-mono text-sm uppercase tracking-wide text-amber"
          >
            {site.role || "role — pending"}
          </motion.p>

          {/* 3. Tagline */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            {HERO_TAGLINE}
          </motion.p>

          {/* 4. Availability status — subtle indicator, dot pulses gently only when open */}
          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                site.availability.open ? "bg-teal animate-pulse" : "bg-ink-faint"
              )}
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-ink-muted">{HERO_AVAILABILITY_LABEL}</span>
          </motion.div>

          {/* 5. Primary + secondary actions — stack full-width on mobile, inline from sm: up */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Button href="#work" className="group w-full sm:w-auto">
              View My Work
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 ease-signal group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
            <Button href={site.resumeUrl || "#"} variant="outline" className="w-full sm:w-auto">
              Download Resume
            </Button>
          </motion.div>

          {/* 6. Location — subtle, last in the hierarchy */}
          <motion.p variants={fadeUp} className="mt-6 font-mono text-xs text-ink-faint">
            {site.location || "location — pending"}
          </motion.p>
        </motion.div>
      </Container>

      <Container className="relative mt-16 md:mt-20">
        <SignalWaveform className="h-32 w-full md:h-44" />
      </Container>
    </section>
  );
}

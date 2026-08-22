"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { socialIconMap, MailIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";

const linkedin = site.socials.find((social) => social.icon === "linkedin");
const github = site.socials.find((social) => social.icon === "github");

const actions = [
  {
    label: "Email me",
    sublabel: site.email || "you@example.com",
    href: site.email ? `mailto:${site.email}` : "#",
    Icon: MailIcon,
    external: false,
  },
  linkedin && {
    label: "LinkedIn",
    sublabel: linkedin.href.replace(/^https?:\/\//, ""),
    href: linkedin.href,
    Icon: socialIconMap.linkedin,
    external: true,
  },
  github && {
    label: "GitHub",
    sublabel: github.href.replace(/^https?:\/\//, ""),
    href: github.href,
    Icon: socialIconMap.github,
    external: true,
  },
].filter(Boolean) as {
  label: string;
  sublabel: string;
  href: string;
  Icon: (typeof socialIconMap)["github"];
  external: boolean;
}[];

export function Contact() {
  return (
    <Section
      id="contact"
      heading="Have a problem worth building?"
      intro="I'm open to software engineering and data-focused opportunities."
      bordered
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="flex flex-col divide-y divide-line/80 border-t border-line/80"
      >
        {actions.map(({ label, sublabel, href, Icon, external }) => (
          <motion.a
            key={label}
            variants={fadeUp}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200 ease-signal hover:text-amber"
          >
            <span className="flex items-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-ink-muted transition-colors duration-200 ease-signal group-hover:text-amber" />
              <span className="flex flex-col">
                <span className="font-display text-lg text-ink transition-colors duration-200 ease-signal group-hover:text-amber">
                  {label}
                </span>
                <span className="font-mono text-xs text-ink-muted">{sublabel}</span>
              </span>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-lg text-ink-muted transition-transform duration-200 ease-signal group-hover:translate-x-1 group-hover:text-amber"
            >
              →
            </span>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

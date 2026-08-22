"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";
import { Tag } from "@/components/ui/Tag";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { projects } from "@/content/projects";
import { fadeUp, scrollViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CATEGORY_LABEL: Record<string, string> = {
  engineering: "Engineering",
  data: "Data",
  ml: "ML / AI",
};

export function Work() {
  if (projects.length === 0) {
    return (
      <Section id="work" heading="Selected work" intro="Case studies, not a link dump.">
        <EmptyState file="src/content/projects.ts" />
      </Section>
    );
  }

  return (
    <Section id="work" heading="Selected work" intro="Case studies, not a link dump.">
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.article
            key={project.slug}
            variants={fadeUp}
            className={cn(project.featured && "md:col-span-2")}
          >
            <Panel interactive className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-teal">
                    {CATEGORY_LABEL[project.category]} · {project.year}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-ink">{project.title}</h3>
                  {project.role && (
                    <p className="mt-1 text-xs text-ink-faint">{project.role}</p>
                  )}
                </div>
                {project.featured && (
                  <Tag className="shrink-0 border-amber/40 text-amber">Featured</Tag>
                )}
              </div>

              <div className="mt-3 flex-1">
                <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                        {m.label}
                      </dt>
                      <dd className="mt-1 font-display text-lg text-amber">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs font-medium text-ink transition-all duration-200 ease-signal hover:-translate-y-0.5 hover:border-amber/60 hover:text-amber"
                    >
                      {link.label}
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </Panel>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}

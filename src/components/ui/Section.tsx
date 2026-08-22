import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** URL fragment, also rendered as a terminal-style path label, e.g. "work" -> ~/work */
  id: string;
  heading: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  /** Section becomes a visually bounded "panel" with corner ticks. Off by default. */
  bordered?: boolean;
}

export function Section({ id, heading, intro, children, className, bordered }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("py-20 md:py-28 scroll-mt-20", className)}
    >
      <Container>
        <div className={cn(bordered && "relative border border-line/80 rounded-md p-6 md:p-10")}>
          {bordered && <CornerTicks />}
          <header className="mb-12 md:mb-16 max-w-2xl">
            <p className="font-mono text-xs tracking-wide text-amber mb-3 select-none" aria-hidden="true">
              ~/{id}
            </p>
            <h2 id={`${id}-heading`} className="font-display text-display-md text-ink">
              {heading}
            </h2>
            {intro && <p className="mt-4 text-ink-muted leading-relaxed">{intro}</p>}
          </header>
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Instrument-bezel corner marks — used sparingly on "bordered" panels only. */
function CornerTicks() {
  const base = "absolute h-2.5 w-2.5 border-amber/70";
  return (
    <>
      <span className={cn(base, "-top-px -left-px border-l-2 border-t-2")} />
      <span className={cn(base, "-top-px -right-px border-r-2 border-t-2")} />
      <span className={cn(base, "-bottom-px -left-px border-l-2 border-b-2")} />
      <span className={cn(base, "-bottom-px -right-px border-r-2 border-b-2")} />
    </>
  );
}

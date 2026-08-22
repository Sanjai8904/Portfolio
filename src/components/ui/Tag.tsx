import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

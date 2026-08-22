import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Adds hover affordance for clickable panels (project cards, etc). */
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-line bg-surface p-6 transition-all duration-300 ease-signal",
        interactive &&
          "hover:-translate-y-1 hover:border-amber/50 hover:shadow-[0_20px_45px_-28px_rgba(232,163,61,0.45)] focus-within:-translate-y-1 focus-within:border-amber/60",
        className
      )}
    >
      {children}
    </div>
  );
}

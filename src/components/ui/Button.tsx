import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-amber text-base hover:bg-amber/90 border border-amber",
  outline:
    "border border-line text-ink hover:border-amber/60 hover:text-amber bg-transparent",
  ghost: "text-ink-muted hover:text-ink bg-transparent",
};

const shared =
  "inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-medium transition-colors duration-200 ease-signal focus-visible:outline-2";

export function Button({
  href,
  variant = "primary",
  className,
  children,
  ...rest
}: BaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  )) {
  const classes = cn(shared, styles[variant], className);

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-content px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}

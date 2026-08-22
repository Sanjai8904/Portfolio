"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Nav } from "./Nav";
import { MobileMenu } from "./MobileMenu";
import { site } from "@/content/site";

export function Header() {
  const progress = useScrollProgress();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/85 backdrop-blur">
      {/* Scroll-progress rail — the page's own "signal level" */}
      <motion.div
        className="h-[2px] origin-left bg-amber"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="#top" className="font-display text-base font-semibold tracking-tight text-ink">
          {site.name || "your-name"}
          <span className="text-amber">.</span>
        </Link>
        <Nav />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

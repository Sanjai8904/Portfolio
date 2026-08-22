import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { socialIconMap } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="font-mono text-xs text-ink-faint">
          Designed & developed by {site.name || "your-name"} · built with Next.js · © {year}
        </p>

        <div className="flex items-center gap-4">
          {site.socials.map((social) => {
            const Icon = socialIconMap[social.icon];
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="text-ink-muted transition-colors duration-200 ease-signal hover:text-amber"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <a
            href="#top"
            className="font-mono text-xs text-ink-muted hover:text-amber"
          >
            ↑ top
          </a>
        </div>
      </Container>
    </footer>
  );
}

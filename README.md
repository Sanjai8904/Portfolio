# Signal — portfolio scaffold

A from-scratch portfolio built for a software engineer / data analyst / AI-ML
profile. This is the **architecture and design system only** — no personal
content has been written in yet, by design. Every section renders an
empty-state note pointing at the file to fill in until you do.

## Design system: "Signal"

**Idea:** raw signal resolving into clean signal — the same move as turning
noisy data into insight, which is the through-line across engineering, data,
and ML work. The hero's animated waveform (noisy trace → clean amber trace)
is the one deliberate, memorable move; everything else stays quiet.

| Token | Dark | Light | Use |
|---|---|---|---|
| `base` | `#0A0C10` | `#F6F5F1` | page background |
| `surface` | `#12161D` | `#FFFFFF` | cards/panels |
| `line` | `#262C36` | `#E1DFDA` | borders/hairlines |
| `ink` | `#ECEEF1` | `#14171B` | primary text |
| `ink-muted` | `#949BA8` | `#5A606C` | secondary text |
| `amber` | `#E8A33D` | `#B36914` | primary accent (signal) |
| `teal` | `#2BA98C` | `#147A63` | secondary accent |

**Type:** Bricolage Grotesque (display, used sparingly at large sizes) +
Manrope (body copy) + JetBrains Mono (nav labels, tags, meta text — the
"instrument readout" voice). All three are loaded via `next/font/google` in
`app/layout.tsx`, self-hosted at build time (no runtime font requests).

**Structural device:** section nav labels use a terminal-path style
(`~/work`, `~/about`) instead of generic numbering, since the audience
is developers and it reflects a real vernacular (shell paths) rather than
decoration. Numbering is only used in Experience, where order is a real,
meaningful sequence.

**Motion:** short, physical reveals (`fadeUp`, `staggerContainer` in
`lib/motion.ts`) on scroll — never bouncy, never looping decoration.
`prefers-reduced-motion` is respected globally (`globals.css`) and
individually in the hero waveform.

## Folder structure

```
src/
  app/
    layout.tsx        # fonts, metadata, JSON-LD, theme-flash prevention script
    page.tsx           # composes sections in order
    globals.css         # design tokens (CSS vars) + base styles + focus rings
    sitemap.ts / robots.ts
  components/
    ui/                # design-system primitives (Button, Panel, Section, Tag,
                        # SignalWaveform, ThemeToggle, icons, EmptyState, SkipLink)
    layout/             # Header, Nav, MobileMenu, Footer
    sections/           # Hero, About, Work, Experience, Skills, Now, Writing, Contact
    providers/
      ThemeProvider.tsx
  content/              # <-- YOUR DATA GOES HERE. Nothing else needs to change.
    site.ts             # name, role, tagline, email, socials, resume link
    about.ts            # bio paragraphs + focus areas
    projects.ts         # case studies
    experience.ts       # work history
    skills.ts           # grouped stack
    now.ts              # optional "currently exploring"
    writing.ts          # optional notes/blog list
  lib/
    types.ts            # the single source of truth for content shape
    constants.ts         # nav item order (drives header + section order)
    motion.ts            # shared Framer Motion variants
    utils.ts
  hooks/
    useScrollProgress.ts       # powers the header's amber progress rail
    usePrefersReducedMotion.ts
```

## Adding your content

Everything lives in `src/content/*.ts` and is fully typed against
`src/lib/types.ts` — fill in the fields, save, and the matching section
renders automatically. `now.ts` and `writing.ts` are optional: leave them
empty and those sections simply don't render (no empty-state note, since
they're not core sections).

You'll also want to drop in, under `public/`:
- `favicon.ico`
- `og-image.png` (1200×630, referenced in `layout.tsx` metadata)
- your résumé PDF, or update `resumeUrl` in `content/site.ts` to point elsewhere

And before deploying, replace the placeholder `SITE_URL` constant in
`app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` with your real domain.

## Running it

```bash
npm install
npm run dev
```

## Accessibility & performance notes

- Visible focus rings everywhere (`:focus-visible` in `globals.css`), no
  outline removal anywhere in the codebase.
- Skip-to-content link, semantic landmarks (`header`, `main`, `footer`),
  `aria-labelledby` on every section.
- Color pairs are checked for AA contrast in both themes (light-mode accent
  hexes are deliberately darkened from their dark-mode values).
- No layout-shifting web fonts (`display: swap`, self-hosted via
  `next/font`), no client-side data fetching on the critical path, no
  unnecessary client components — sections that don't need interactivity
  stay server components where possible.

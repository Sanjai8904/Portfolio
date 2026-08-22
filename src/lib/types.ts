export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  socials: SocialLink[];
  availability: {
    open: boolean;
    note: string;
  };
}

export interface SocialLink {
  label: string;
  href: string;
  /** icon key resolved in ui/icons.tsx */
  icon: "github" | "linkedin" | "twitter" | "kaggle" | "mail" | "scholar";
}

export interface AboutContent {
  paragraphs: string[];
  focusAreas: { title: string; description: string }[];
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
  category: "engineering" | "data" | "ml";
  highlights?: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  org: string;
  role: string;
  start: string;
  end: string; // "present" allowed
  location: string;
  summary: string;
  highlights: string[];
}

export interface SkillGroup {
  domain: "Languages" | "Software Development" | "Data & Analytics" | "Tools";
  items: string[];
}

export interface WritingPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  href: string;
}

export interface NowItem {
  label: string;
  detail: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  university: string;
  start: string;
  end: string; // "present" allowed
}

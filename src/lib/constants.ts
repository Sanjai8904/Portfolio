export interface NavItem {
  label: string;
  href: string;
}

/** Order here drives both the header nav and the section order on the page. */
export const NAV_ITEMS: NavItem[] = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "experience", href: "#experience" },
  { label: "education", href: "#education" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
];

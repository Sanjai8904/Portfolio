import { clsx, type ClassValue } from "clsx";

/** Merge conditional class names. Kept dependency-light (no tailwind-merge)
 *  since this design system uses a small, non-conflicting utility set. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

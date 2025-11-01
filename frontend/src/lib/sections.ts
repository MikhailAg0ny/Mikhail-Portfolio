export const SECTION_ORDER = [
  'hero',
  'about',
  'skills',
  'projects',
  'achievements',
  'certifications',
  'contact',
] as const;

export type SectionKey = (typeof SECTION_ORDER)[number];

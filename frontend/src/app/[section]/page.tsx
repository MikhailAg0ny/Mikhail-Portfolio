import { redirect, notFound } from 'next/navigation';
import HomePage from '@/components/pages/HomePage';
import { SECTION_ORDER, type SectionKey } from '@/lib/sections';

const VALID_SECTIONS = new Set<SectionKey>(SECTION_ORDER);

export default function SectionPage({ params }: { params: { section: string } }) {
  const sectionParam = params.section as SectionKey | undefined;

  if (!sectionParam) {
    notFound();
  }

  if (sectionParam === 'hero') {
    redirect('/');
  }

  if (!VALID_SECTIONS.has(sectionParam)) {
    notFound();
  }

  return <HomePage initialSection={sectionParam} />;
}

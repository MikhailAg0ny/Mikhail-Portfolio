import { redirect, notFound } from 'next/navigation';
import HomePage, { SECTION_ORDER, type SectionKey } from '@/components/pages/HomePage';

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

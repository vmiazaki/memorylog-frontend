// app/year/[slug]/page.tsx
import { getYearBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export default async function YearPost({ params }: { params: { slug: string } }) {
  const year = await getYearBySlug(params.slug);
  if (!year) return notFound();

  return (
    <main>
      <h1>Year: {params.slug}</h1>
      <pre>{JSON.stringify(year, null, 2)}</pre>
    </main>
  );
}

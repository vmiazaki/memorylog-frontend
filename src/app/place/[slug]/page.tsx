// app/place/[slug]/page.tsx
import { getPlaceBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export default async function PlacePost({ params }: { params: { slug: string } }) {
  const place = await getPlaceBySlug(params.slug);
  if (!place) return notFound();

  return (
    <main>
      <h1>Place: {params.slug}</h1>
      <pre>{JSON.stringify(place, null, 2)}</pre>
    </main>
  );
}
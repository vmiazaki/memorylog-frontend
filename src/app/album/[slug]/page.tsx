// app/album/[slug]/page.tsx
import { getAlbumBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';

export default async function AlbumPost({ params }: { params: { slug: string } }) {
  const album = await getAlbumBySlug(params.slug);
  if (!album) return notFound();

  return (
    <main>
      <h1>Album: {params.slug}</h1>
      <pre>{JSON.stringify(album, null, 2)}</pre>
    </main>
  );
}
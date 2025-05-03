// app/album/[slug]/page.tsx (Server Component)

import { getAlbumBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import AlbumClient from './AlbumClient';

export default async function AlbumPage(props: { params: { slug: string } }) {
  const { params } = props;
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) return notFound();

  return <AlbumClient album={album} />;
}

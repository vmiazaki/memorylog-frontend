// app/albums/page.tsx (Server Component)

import AlbumsClient from './AlbumsClient';
import { getAlbums } from '@/lib/strapi';

export default async function AlbumsPage() {
  const albums = await getAlbums();
  return <AlbumsClient albums={albums} />;
}

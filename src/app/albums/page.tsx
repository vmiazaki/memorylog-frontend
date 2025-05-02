// app/albums/page.tsx
import { getAlbums } from '@/lib/strapi';

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <main>
      <h1>Albums</h1>
      <pre>{JSON.stringify(albums, null, 2)}</pre>
    </main>
  );
}
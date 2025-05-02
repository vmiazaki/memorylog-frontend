import { getAlbums } from '@/lib/strapi';

export default async function Home() {
  const albums = await getAlbums();

  return (
    <main>
      <h1>Albums</h1>
      <pre>{JSON.stringify(albums, null, 2)}</pre>
    </main>
  );  
}

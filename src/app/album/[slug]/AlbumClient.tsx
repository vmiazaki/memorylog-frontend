// app/album/[slug]/AlbumClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Album } from '@/lib/global';

export default function AlbumClient({ album }: { album: Album }) {
  usePageReady();

  return (
    <>
      <h1 className="text-2xl font-bold">Album: {album.title}</h1>
      <pre className="mt-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(album, null, 2)} 
        {/* I CAN DO IT */}
      </pre>
    </>
  );
}

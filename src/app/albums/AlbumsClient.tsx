// app/albums/AlbumsClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Album } from '@/lib/global';

export default function AlbumsClient({ albums }: { albums: Album[] }) {
  usePageReady();

  return (
    <>
      <h1 className="text-2xl font-bold">Albums</h1>
      <pre className="mt-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(albums, null, 2)}
      </pre>
    </>
  );
}
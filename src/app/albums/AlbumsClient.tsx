// app/albums/AlbumsClient.tsx (Client Component)

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Album } from '@/lib/global';
import { usePageReady } from '@/lib/mounted';

export default function AlbumsClient({ albums }: { albums: { data: Album[] } }) {
  usePageReady();
  const data = albums.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((album) => (
          <Link
            key={album.id}
            href={`/album/${album.slug}`}
            className="block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full aspect-square bg-gray-100">
              {album.coverImage?.url ? (
                <Image
                  src={album.coverImage.url}
                  alt={album.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                  No Cover Image
                </div>
              )}
            </div>
            <div className="p-2 text-center text-base font-medium">
              {album.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// app/years/YearsClient.tsx (Client Component)

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePageReady } from '@/lib/mounted';
import { Year, Album } from '@/lib/global';

function getRandomAlbums(albums: Album[], count = 3): Album[] {
  const shuffled = [...albums].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function YearsClient({ years }: { years: { data: Year[] } }) {
  usePageReady();
  const [randomAlbumsByYear, setRandomAlbumsByYear] = useState<
    Record<number, Album[]>
  >({});

  useEffect(() => {
    const randomized: Record<number, Album[]> = {};
    years.data.forEach((year) => {
      randomized[year.id] = getRandomAlbums(year.albums || []);
    });
    setRandomAlbumsByYear(randomized);
  }, [years]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Years</h1>
      <div className="flex flex-col gap-6">
        {years.data.map((year) => (
          <div
            key={year.id}
            className="w-full p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/year/${year.slug}`}>
              <div className="text-xl font-semibold text-center mb-4">{year.year}</div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(randomAlbumsByYear[year.id] || []).map((album) => (
                <Link
                  key={album.id}
                  href={`/album/${album.slug}`}
                  className="relative group aspect-square w-full bg-gray-100 rounded-xl overflow-hidden"
                >
                  {album.coverImage?.url ? (
                    <Image
                      src={album.coverImage.url}
                      alt={album.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium transition-opacity">
                    {album.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

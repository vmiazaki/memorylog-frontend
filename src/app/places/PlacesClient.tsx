// app/places/PlacesClient.tsx (Client Component)

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePageReady } from '@/lib/mounted';
import { Place } from '@/lib/global';

export default function PlacesClient({ places }: { places: { data: Place[] } }) {
  usePageReady();
  const data = places.data;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Places</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((place) => (
          <Link
            key={place.id}
            href={`/place/${place.slug}`}
            className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative w-full aspect-square bg-gray-100">
              {place.coverImage?.url ? (
                <Image
                  src={place.coverImage.url}
                  alt={place.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                  No Cover Image
                </div>
              )}
            </div>
            <div className="p-4 text-center">
              <div className="text-lg font-semibold">{place.name}</div>
              <div className="text-sm text-gray-600">
                {place.albums?.length ?? 0} {place.albums?.length === 1 ? 'album' : 'albums'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

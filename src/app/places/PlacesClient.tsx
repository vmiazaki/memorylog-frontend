// app/places/PlacesClient.tsx (Client Component)

'use client';

import Link from 'next/link';
import { Place } from '@/lib/global';
import { usePageReady } from '@/lib/mounted';
import TransitionImage from '@/components/TransitionImage';

export default function PlacesClient({ places }: { places: { data: Place[] } }) {
  usePageReady();
  const data = places.data;

  return (
    <>
      <div className="main-title main-inner">
        <div className="main-title-inner">
          <h1>All Places</h1>
          <p>Ordered Chronologically</p>
        </div>
        <p>{data.length} Places Logged</p>
      </div>

      <div className="main-content main-inner">
        {data.map((place) => (
          <Link
            key={place.id}
            href={`/place/${place.slug}`}
            className="place-entry"
          >
            {place.coverImage?.url ? (
              <TransitionImage
                src={place.coverImage.url}
                alt={place.name}
                className="place-image"
              />
            ) : (
              <div className="place-image-placeholder">
                No Cover Image
              </div>
            )}

            <div className="place-name">
              {place.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

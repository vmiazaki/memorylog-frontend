// app/places/PlacesClient.tsx (Client Component)

'use client';

import TransitionLink from '@/components/TransitionLink';
import { Place } from '@/lib/global';
import { usePageReady } from '@/lib/mounted';
import TransitionImage from '@/components/TransitionImage';

export default function PlacesClient({ places }: { places: { data: Place[] } }) {
  usePageReady();
  const data = places.data;

  return (
    <>
      <div className="main-title">
        <div className="main-title-inner">
          <h1>All Places</h1>
          <p>Organized by Location</p>
        </div>
        <p>{data.length} Places Logged</p>
      </div>

      <div className="main-content main-inner">
        {data.map((place) => (
          <TransitionLink
            key={place.id}
            href={`/place/${place.slug}`}
            className="place-entry"
          >
            <div className="place-image-wrapper">
              <TransitionImage
                src={place.coverImage?.url}
                alt={place.name}
                className="place-image"
              />
              <div className="place-overlay">+</div>
            </div>
            <div className="place-meta">
              <div className="place-title">
                {place.name}
              </div>
              <div className="place-albums-count">
                {place.albums?.length === 1
                  ? '1 album'
                  : `${place.albums?.length || 0} albums`}
              </div>
            </div>
          </TransitionLink>
        ))}
      </div>
    </>
  );
}

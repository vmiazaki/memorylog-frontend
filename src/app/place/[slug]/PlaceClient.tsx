// app/place/[slug]/PlaceClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Place } from '@/lib/global';
import TransitionLink from '@/components/TransitionLink';
import TransitionImage from '@/components/TransitionImage';

export default function PlaceClient({ place }: { place: { data: Place[] } }) {
  usePageReady();

  const currentPlace = place.data[0];
  const albums = currentPlace.albums || [];

  return (
    <>
      <div className="main-title main-inner">
        <div className="main-title-inner">
          <h1>{currentPlace.name}</h1>
          {currentPlace.location && <p>{currentPlace.location}</p>}
        </div>
        <p>{albums.length} {albums.length === 1 ? 'Album' : 'Albums'} Logged</p>
      </div>

      <div className="main-content main-inner">
        {albums.map((album) => (
          <TransitionLink
            key={album.id}
            href={`/album/${album.slug}`}
            className="album-entry"
          >
            <div className="album-image-wrapper">
              <TransitionImage
                src={album.coverImage?.url}
                alt={album.title}
                className="album-image"
              />
              <div className="album-overlay-meta">
                <p className="album-year">{album.year?.year}</p>
                <p className="album-period">{album.timePeriod}</p>
              </div>
            </div>

            <div className="album-title">
              {album.title}
            </div>
          </TransitionLink>
        ))}
      </div>
    </>
  );
}

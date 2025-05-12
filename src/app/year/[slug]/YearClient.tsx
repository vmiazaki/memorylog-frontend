// app/year/[slug]/YearClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Year } from '@/lib/global';
import TransitionLink from '@/components/TransitionLink';
import TransitionImage from '@/components/TransitionImage';
import { spellOutYear } from '@/lib/speller';

export default function YearClient({ year }: { year: { data: Year[] } }) {
  usePageReady();

  const currentYear = year.data[0];
  const albums = currentYear.albums || [];

  return (
    <>
      <div className="main-title">
        <div className="main-title-inner">
          <h1>{currentYear.year}</h1>
          <p>{spellOutYear(Number(currentYear.year))}</p>
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

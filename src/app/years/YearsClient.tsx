// app/years/YearsClient.tsx (Client Component)

'use client';

import Link from 'next/link';
import { Year, Album } from '@/lib/global';
import { usePageReady } from '@/lib/mounted';
import { spellOutYear } from '@/lib/speller';
import TransitionImage from '@/components/TransitionImage';

interface YearWithAlbums extends Year {
  albums: Album[];
}

export default function YearsClient({ years }: { years: { data: YearWithAlbums[] } }) {
  usePageReady();
  const data = years.data;

  return (
    <>
      <div className="main-title main-inner">
        <div className="main-title-inner">
          <h1>All Years</h1>
          <p>Since 1995</p>
        </div>
        <p>{data.length} Years Logged</p>
      </div>

      <div className="main-content main-inner">
        {data.map((year) => (
          <div key={year.id} className="year-entry">
            <Link href={`/year/${year.slug}`} className="year-label">
              <span>{year.year}</span>
              <span className="year-label-text">
                {spellOutYear(Number(year.year))}
              </span>
            </Link>

            <div className="year-albums">
              {year.albums?.slice(0, 5).map((album: Album) => (
                <Link
                  key={album.id}
                  href={`/album/${album.slug}`}
                  className="year-album-link"
                >
                  {album.coverImage?.url ? (
                    <TransitionImage
                      src={album.coverImage.url}
                      alt={album.title}
                      className="year-album-image"
                    />
                  ) : (
                    <div className="year-album-placeholder">No Cover</div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

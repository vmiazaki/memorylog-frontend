// app/years/YearsClient.tsx (Client Component)

'use client';

import TransitionLink from '@/components/TransitionLink';
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
            <TransitionLink href={`/year/${year.slug}`} className="year-link">
              <span className="year-label-num">{year.year}</span>
              <span className="year-label-txt">
                {spellOutYear(Number(year.year))}
              </span>
            </TransitionLink>

            <div className="year-albums">
              {year.albums?.slice(0, 5).map((album: Album) => (
                <TransitionLink
                  key={album.id}
                  href={`/album/${album.slug}`}
                  className="year-album-link"
                >
                  <div className="year-album-image-wrapper">
                    <TransitionImage
                      src={album.coverImage?.url}
                      alt={album.title}
                      className="year-album-image"
                    />
                    <div className="year-album-overlay">+</div>
                  </div>
                </TransitionLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

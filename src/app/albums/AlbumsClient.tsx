// app/albums/AlbumsClient.tsx (Client Component)

'use client';

import Link from 'next/link';
import { Album } from '@/lib/global';
import { usePageReady } from '@/lib/mounted';
import TransitionImage from '@/components/TransitionImage';

export default function AlbumsClient({ albums }: { albums: { data: Album[] } }) {
  usePageReady();
  const data = albums.data;

  return (
    <>
      <div className="main-title main-inner">
        <div className="main-title-inner">
          <h1>All Albums</h1>
          <p>Ordered Chronologically</p>
        </div>
        <p>{data.length} Albums Logged</p>
      </div>

      <div className="main-content main-inner">
        {data.map((album) => (
          <Link
            key={album.id}
            href={`/album/${album.slug}`}
            className="album-entry"
          >
            <div className="album-image-wrapper">
              <TransitionImage
                src={album.coverImage?.url || '/fallback.jpg'}
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
          </Link>
        ))}
      </div>
    </>
  );
}

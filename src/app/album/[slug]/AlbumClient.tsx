// app/album/[slug]/AlbumClient.tsx (Client Component)

'use client';

import { useState } from 'react';
import { usePageReady } from '@/lib/mounted';
import { Album } from '@/lib/global';
import TransitionLink from '@/components/TransitionLink';
import TransitionImage from '@/components/TransitionImage';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Counter } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/counter.css';
import video from 'yet-another-react-lightbox/plugins/video';
import type { SlideImage, SlideVideo } from 'yet-another-react-lightbox';

export default function AlbumClient({ album }: { album: { data: Album[] } }) {
  usePageReady();

  const currentAlbum = album.data[0];
  const photos = currentAlbum.photos || [];

  const imageSlides: SlideImage[] = photos.map((photo) => ({
    src: photo.url,
    alt: photo.alternativeText || photo.name || currentAlbum.title,
  }));

  const videoSlide: SlideVideo | null = currentAlbum.video
    ? {
        type: 'video' as const,
        poster: currentAlbum.videoCover?.url,
        sources: [
          {
            src: currentAlbum.video.url,
            type: 'video/mp4',
          },
        ],
        autoPlay: true,
      }
    : null;

  const slides = videoSlide ? [...imageSlides, videoSlide] : imageSlides;

  const [index, setIndex] = useState(-1);

  return (
    <>
      <div
        className="album-header"
        style={{
          backgroundImage: `url(${currentAlbum.coverImage?.url})`,
        }}
      >
        <div className="album-header-inner">
          <h1>{currentAlbum.title}</h1>

          {currentAlbum.places && currentAlbum.places.length > 0 && (
            <div className="album-meta-block album-meta-place">
              <TransitionLink href={`/place/${currentAlbum.places[0].slug}`}>
                {currentAlbum.places[0].name}
              </TransitionLink>
              {currentAlbum.places[0].location && (
                <span>{currentAlbum.places[0].location}</span>
              )}
            </div>
          )}

          {currentAlbum.year && (
            <div className="album-meta-block album-meta-year">
              <TransitionLink href={`/year/${currentAlbum.year.slug}`}>
                {currentAlbum.year.year}
              </TransitionLink>
              {currentAlbum.timePeriod && <span>{currentAlbum.timePeriod}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="main-content main-inner album-grid">
        {photos.length === 0 && (
          <p className="album-no-media">No media found for this album</p>
        )}

        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="album-media-entry"
            onClick={() => setIndex(i)}
            style={{ cursor: 'pointer' }}
          >
            <TransitionImage
              src={photo.url}
              alt={photo.alternativeText || photo.name || currentAlbum.title}
              className="album-media-image"
            />
            <div className="album-media-overlay"><span>⛶</span> View</div>
          </div>
        ))}
      </div>

      {currentAlbum.video && currentAlbum.videoCover && (
        <div className="main-content main-inner album-video-section">
          <div
            className="album-video-wrapper"
            onClick={() => setIndex(slides.length - 1)}
            style={{ backgroundImage: `url(${currentAlbum.videoCover.url})` }}
          >
            <div className="album-video-overlay"></div>
            <div className="album-video-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <p>Play</p>
            </div>
          </div>
        </div>
      )}

      {index >= 0 && (
        <Lightbox
          open
          close={() => setIndex(-1)}
          slides={slides}
          index={index}
          on={{ view: ({ index }) => setIndex(index) }}
          plugins={[Counter, video]}
          carousel={{ finite: true }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
        />
      )}
    </>
  );
}

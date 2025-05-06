// component/TransitionLogo.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAlbums } from '@/lib/strapi';
import { useTransition } from './TransitionGlobal';
import { TRANSITION_DURATION } from '@/lib/global';

const TIMING = {
  pauseAfterDelete: TRANSITION_DURATION,
  typePlace: TRANSITION_DURATION * 3,
  pauseAfterPlace: TRANSITION_DURATION,
  typeYear: TRANSITION_DURATION,
  holdFull: TRANSITION_DURATION * 2,
  deleteFull: TRANSITION_DURATION * 2,
  pauseAfterDeleteAll: TRANSITION_DURATION,
  total: TRANSITION_DURATION * 11,
};

export default function TransitionLogo() {
  const router = useRouter();
  const { setPageTransitionState, setCanFadeIn } = useTransition();
  const [logoText, setLogoText] = useState('M');
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetSlug, setTargetSlug] = useState<string | null>(null);
  const [albumMeta, setAlbumMeta] = useState<{ place: string; year: string } | null>(null);

  const handleLogoClick = async () => {
    if (isAnimating || !albumMeta || !targetSlug) return;

    document.querySelectorAll('.nav-link.active').forEach(el => {
      el.classList.remove('active');
    });
  
    setCanFadeIn(false);
    animateLogoWithPlaceAndYear(albumMeta.place, albumMeta.year);
    setPageTransitionState('fadingOut');
  
    setTimeout(() => {
      router.push(`/album/${targetSlug}`);
      fetchRandomAlbum(targetSlug);
    }, TRANSITION_DURATION * 5);
  };
  
  const fetchRandomAlbum = async (excludeSlug?: string) => {
    try {
      const res = await getAlbums();
      const albums = res?.data ?? [];
      if (!albums.length) return;

      let random;
      let attempts = 0;
      do {
        random = albums[Math.floor(Math.random() * albums.length)];
        attempts++;
      } while (random.slug === excludeSlug && attempts < 10);

      const { slug, year, places } = random;
      const place = places?.[0]?.name?.split(',')[0] ?? 'Place';
      const yearStr = year?.year ?? 'Year';

      setTargetSlug(slug);
      setAlbumMeta({ place, year: yearStr });
    } catch (err) {
      console.error('Failed to fetch album:', err);
    }
  };

  const animateLogoWithPlaceAndYear = (place: string, year: string) => {
    setIsAnimating(true);
    setLogoText(''); // delete M instantly
  
    const typeText = (text: string, delay: number, callback: (typed: string) => void) => {
      let typed = '';
      const interval = delay / text.length;
      text.split('').forEach((char, index) => {
        setTimeout(() => {
          typed += char;
          callback(typed);
        }, index * interval);
      });
    };
  
    const deleteText = (text: string, delay: number, callback: (remaining: string) => void) => {
      const interval = delay / text.length;
      text.split('').forEach((_, index) => {
        setTimeout(() => {
          const remaining = text.slice(0, text.length - (index + 1));
          callback(remaining);
        }, index * interval);
      });
    };
  
    // Type place
    setTimeout(() => {
      typeText(place, TIMING.typePlace, (typed) => setLogoText(typed));
    }, TIMING.pauseAfterDelete);
  
    // Type year
    setTimeout(() => {
      typeText(year, TIMING.typeYear, (typed) => setLogoText(`${place} ${typed}`));
    }, TIMING.pauseAfterDelete + TIMING.typePlace + TIMING.pauseAfterPlace);
  
    // Delete full
    setTimeout(() => {
      const full = `${place} ${year}`;
      deleteText(full, TIMING.deleteFull, (remaining) => setLogoText(remaining));
    }, TIMING.pauseAfterDelete + TIMING.typePlace + TIMING.pauseAfterPlace + TIMING.typeYear + TIMING.holdFull);
  
    // Reset animation state  
    setTimeout(() => {
      setIsAnimating(false);
    }, TIMING.pauseAfterDelete + TIMING.typePlace + TIMING.pauseAfterPlace + TIMING.typeYear + TIMING.holdFull + TIMING.deleteFull);

    // Set logo text back to 'M'   
    setTimeout(() => {
      setLogoText('M');
    }, TIMING.total);
  };  

  useEffect(() => {
    fetchRandomAlbum();
  }, []);

  return (
    <div
      onClick={handleLogoClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLogoClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Go to a random album"
      className="nav-logo cursor-pointer"
    >
      <span className={`nav-m ${isAnimating ? 'nav-random-album' : ''}`}>
        {isAnimating && <span className="nav-arrow">&gt;</span>}
        {logoText}
      </span>
      <span className="nav-underscore">_</span>
    </div>
  );  
}

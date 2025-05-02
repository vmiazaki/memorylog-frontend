// component/NavLogo.tsx

"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { getAlbums } from '@/lib/strapi';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function NavLogo() {
  const router = useRouter();
  const [logoText, setLogoText] = useState('M');
  const [blinking, setBlinking] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [targetSlug, setTargetSlug] = useState<string | null>(null);
  const [albumMeta, setAlbumMeta] = useState<{ place: string; year: string } | null>(null);
  const previousSlugRef = useRef<string | null>(null);

  const handleLogoClick = async () => {
    if (isAnimating || !albumMeta || !targetSlug) return;

    animateLogoWithPlaceAndYear(albumMeta.place, albumMeta.year);
    await sleep(4400);
    router.push(`/album/${targetSlug}`);
    await fetchRandomAlbum(targetSlug); // Preload next
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
      previousSlugRef.current = slug;
    } catch (err) {
      console.error('Failed to fetch album:', err);
      displayFallbackText('Error Fetching');
    }
  };

  const displayFallbackText = (message: string) => {
    setLogoText(message);
    setBlinking(false);
    setTimeout(() => {
      setLogoText('M');
      setBlinking(true);
    }, 5000);
  };

  const animateLogoWithPlaceAndYear = (place: string, year: string) => {
    setIsAnimating(true);
    setBlinking(false);
    setLogoText('M');

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

    deleteText('M', 500, () => setLogoText(''));
    setTimeout(() => setBlinking(true), 300);
    setTimeout(() => setBlinking(false), 600);

    setTimeout(() => {
      typeText(place, 1000, (typed) => {
        setLogoText(typed);
      });
    }, 600);

    setTimeout(() => setBlinking(true), 1800);
    setTimeout(() => {
      setBlinking(false);
      typeText(year, 400, (typed) => {
        setLogoText(`${place} ${typed}`);
      });
    }, 2200);

    setTimeout(() => setBlinking(true), 2800);
    setTimeout(() => {
      setBlinking(false);
      const full = `${place} ${year}`;
      deleteText(full, 800, (remaining) => {
        setLogoText(remaining);
      });
    }, 3200);

    setTimeout(() => {
      setLogoText('M');
      setBlinking(true);
      setIsAnimating(false);
    }, 4000);
  };

  useEffect(() => {
    fetchRandomAlbum();
  }, []);

  return (
    <div onClick={handleLogoClick} className="text-lg font-mono cursor-pointer">
      <span>{logoText}</span>
      {blinking && <span className="animate-blink">|</span>}
    </div>
  );
}

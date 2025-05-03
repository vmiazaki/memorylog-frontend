// component/HomeLoader.tsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TRANSITION_DURATION } from '@/lib/global';

export default function HomeLoader() {
  const [visible, setVisible] = useState(true);
  const [shouldSlide, setShouldSlide] = useState(false);
  const [animationKey] = useState(() => Date.now()); // Unique key per render

  useEffect(() => {
    const letterDelay = 100;
    const glitchDuration = 'MEMORYLOG'.length * letterDelay;
    const slideStart = TRANSITION_DURATION + glitchDuration;

    const slideTimer = setTimeout(() => {
      setShouldSlide(true);
    }, slideStart);

    return () => {
      clearTimeout(slideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      key={animationKey}
      aria-hidden="true"
      className="homeLoader"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: shouldSlide ? '-100svh' : '0svh',
      }}
      transition={{
        opacity: { duration: TRANSITION_DURATION / 1000 },
        y: {
          duration: 0.5,
          ease: [0.755, 0.050, 0.855, 0.060],
        },
      }}
      onAnimationComplete={() => {
        if (shouldSlide) {
          setTimeout(() => setVisible(false), 50); // small buffer after slide
        }
      }}
    />
  );
}
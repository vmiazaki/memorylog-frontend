// app/page.tsx (Homepage)

'use client';

import { motion } from 'framer-motion';
import HomeTitle from '@/components/HomeTitle';
import HomeLoader from '@/components/HomeLoader';
import { TRANSITION_DURATION } from '@/lib/global';

export default function HomePage() {
  return (
    <>
      {/* Title */}
      <HomeTitle />

      {/* Curtain Loader */}
      <HomeLoader />

      {/* Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="homeVideo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: TRANSITION_DURATION / 500,
          duration: TRANSITION_DURATION / 500,
          ease: 'easeInOut',
        }}
      >
        <source src="https://memorylog-cdn.b-cdn.net/13432587_3840_2160_30fps.mp4" type="video/mp4" />
      </motion.video>

      {/* Background Video Overlay */}
      <div className="homeVideoOverlay" />

      {/* Credits Block */}
      <motion.div
        key="homeCredits"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: TRANSITION_DURATION / 1000,
          ease: 'easeInOut',
        }}
        className="homeCredits"
      >
        <p className="creditSmall">a project by</p>
        <p className="creditLarge">Vinícius Miazaki de Moraes</p>
      </motion.div>
    </>
  );
}

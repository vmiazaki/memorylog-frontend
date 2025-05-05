// app/page.tsx (Homepage)

'use client';

import { motion } from 'framer-motion';
import HomeTitle from '@/components/HomeTitle';
import { TRANSITION_DURATION } from '@/lib/global';

export default function HomePage() {
  return (
    <>
      {/* Title */}
      <HomeTitle />

      {/* Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="home-video"
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
      <div className="home-video-overlay" />

      {/* Credits Block */}
      <motion.div
        key="home-credits"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: TRANSITION_DURATION / 1000,
          ease: 'easeInOut',
        }}
        className="home-credits"
      >
        <p className="credit-small">a project by</p>
        <p className="credit-large">Vinícius Miazaki de Moraes</p>
      </motion.div>
    </>
  );
}

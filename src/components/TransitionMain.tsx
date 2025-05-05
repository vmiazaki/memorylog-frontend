// component/TransitionMain.tsx

'use client';

import { motion } from 'framer-motion';
import { useTransition } from './TransitionGlobal';
import { useEffect, useState } from 'react';
import { TRANSITION_DURATION } from '@/lib/global';

export function TransitionMain({ children }: { children: React.ReactNode }) {
  const { pageTransitionState } = useTransition();
  const [hasMounted, setHasMounted] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  }, [hasMounted]);

  if (!hasMounted || !fontsReady) {
    return null; // Wait for client + font readiness before rendering
  }

  const shouldFadeOut = pageTransitionState === 'fadingOut';

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldFadeOut ? 0 : 1 }}
      transition={{
        duration: TRANSITION_DURATION / 1000,
        ease: 'easeInOut',
      }}
      className="app-main"
    >
      {children}
    </motion.main>
  );
}

// component/TransitionMain.tsx

'use client';

import { motion } from 'framer-motion';
import { useTransition } from './TransitionGlobal';
import { useEffect, useState } from 'react';
import { TRANSITION_DURATION } from '@/lib/global';

export function TransitionMain({ children }: { children: React.ReactNode }) {
  const { pageTransitionState } = useTransition();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Prevent mismatches during SSR
    return <main className="flex-1">{children}</main>;
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
      className="flex-1"
    >
      <div className="mainContainer">{children}</div>
    </motion.main>
  );
}

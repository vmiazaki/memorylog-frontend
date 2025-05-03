// components/AppShell.tsx

'use client';

import { motion } from 'framer-motion';
import TransitionLogo from '@/components/TransitionLogo';
import TransitionLink from '@/components/TransitionLink';
import { TRANSITION_DURATION } from '@/lib/global';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="appShell flex flex-col min-h-screen">
      <motion.nav
        className="flex items-center justify-between p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: TRANSITION_DURATION / 500,
          ease: 'easeInOut',
        }}
      >
        <TransitionLogo />
        <div className="navMenu">
          <TransitionLink href="/albums" className="navLink">Albums</TransitionLink>
          <TransitionLink href="/places" className="navLink">Places</TransitionLink>
          <TransitionLink href="/years" className="navLink">Years</TransitionLink>
        </div>
        <TransitionLink className="navMore" href="/about">+</TransitionLink>
      </motion.nav>

      {children}
    </div>
  );
}

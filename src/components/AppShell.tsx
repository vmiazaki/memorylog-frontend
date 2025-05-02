// components/AppShell.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTransition } from './TransitionProvider';
import NavLogo from '@/components/NavLogo';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { hasNavAnimatedIn, setNavAnimatedIn } = useTransition();

  return (
    <div className="flex flex-col min-h-screen">
      <motion.nav
        className="flex items-center justify-between p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          if (!hasNavAnimatedIn) setNavAnimatedIn();
        }}
      >
        {/* Left: M_ Link */}
        <NavLogo />

        {/* Center: Nav Links */}
        <div className="space-x-6 text-center">
          <Link href="/albums" className="hover:underline">Albums</Link>
          <Link href="/places" className="hover:underline">Places</Link>
          <Link href="/years" className="hover:underline">Years</Link>
        </div>

        {/* Right: + Link */}
        <Link href="#" className="text-xl">+</Link>
      </motion.nav>

      {children}
    </div>
  );
}

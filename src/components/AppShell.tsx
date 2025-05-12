// components/AppShell.tsx

'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import TransitionLogo from '@/components/TransitionLogo';
import TransitionLink from '@/components/TransitionLink';
import { TRANSITION_DURATION } from '@/lib/global';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pathParts = pathname.split('/').filter(Boolean); // e.g. ['albums', 'summer-2023']
  const rootSlug = pathParts[0] || 'home'; // fallback to 'home' if on /
  const postId = pathParts[1]; // optional second segment, like 'summer-2023'

  return (
    <div className={clsx('app-shell', `page--${rootSlug}`, postId && `post--${postId}`)}>
      <motion.nav
        className="app-nav"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: TRANSITION_DURATION / 500,
          ease: 'easeInOut',
        }}
      >
        <TransitionLogo />
        <div className="nav-menu">
          <TransitionLink href="/albums" className="nav-link">Albums</TransitionLink>
          <TransitionLink href="/places" className="nav-link">Places</TransitionLink>
          <TransitionLink href="/years" className="nav-link">Years</TransitionLink>
        </div>
        <TransitionLink className="nav-more" href="/about">
          <span className="more-icon">+</span>
        </TransitionLink>
      </motion.nav>

      {children}
    </div>
  );
}

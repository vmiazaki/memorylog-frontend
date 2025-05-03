// components/TransitionLink.tsx

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, MouseEvent, useRef } from 'react';
import { useTransition } from './TransitionGlobal';
import { TRANSITION_DURATION } from '@/lib/global';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setPageTransitionState, setCanFadeIn } = useTransition();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === href) return;

    document.querySelectorAll('.navLink.active').forEach(el => {
      el.classList.remove('active');
    });

    if (linkRef.current) {
      linkRef.current.classList.add('active');
    }

    setCanFadeIn(false);
    setPageTransitionState('fadingOut');
    await new Promise(res => setTimeout(res, TRANSITION_DURATION));
    router.push(href);
    setTimeout(() => setCanFadeIn(true), TRANSITION_DURATION);
  };

  useEffect(() => {
    if (pathname === href && linkRef.current) {
      document.querySelectorAll('.navLink.active').forEach(el => {
        el.classList.remove('active');
      });

      linkRef.current.classList.add('active');
    }
  }, [pathname, href]);

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      ref={linkRef}
    >
      {children}
    </a>
  );
}

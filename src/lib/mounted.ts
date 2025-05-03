// lib/mounted.ts

import { useEffect } from 'react';
import { useTransition } from '@/components/TransitionGlobal';
import { TRANSITION_DURATION } from '@/lib/global';

export function usePageReady() {
  const { setPageTransitionState, setCanFadeIn } = useTransition();

  useEffect(() => {
    requestAnimationFrame(() => {
      setPageTransitionState('fadingIn');
      const timeout = setTimeout(() => {
        setPageTransitionState('idle');
        setCanFadeIn(true); // reset
      }, TRANSITION_DURATION);

      return () => clearTimeout(timeout);
    });
  }, [setPageTransitionState, setCanFadeIn]);
}

// component/transitionGlobal.tsx

'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { usePathname } from 'next/navigation';

type TransitionState = 'idle' | 'fadingOut' | 'fadingIn';

interface TransitionContextProps {
  pageTransitionState: TransitionState;
  setPageTransitionState: (state: TransitionState) => void;
  canFadeIn: boolean;
  setCanFadeIn: (value: boolean) => void;
  showHomeLoader: boolean;
  setShowHomeLoader: (value: boolean) => void;
  slideTrigger: boolean;
  setSlideTrigger: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export function TransitionGlobal({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [pageTransitionState, setPageTransitionState] = useState<TransitionState>('idle');
  const [canFadeIn, setCanFadeIn] = useState(true);
  const [showHomeLoader, setShowHomeLoader] = useState(false);
  const [slideTrigger, setSlideTrigger] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      setShowHomeLoader(true);
      setSlideTrigger(false);
    } else {
      setShowHomeLoader(false);
      setSlideTrigger(false);
    }
  }, [pathname]);

  const contextValue = useMemo(
    () => ({
      pageTransitionState,
      setPageTransitionState,
      canFadeIn,
      setCanFadeIn,
      showHomeLoader,
      setShowHomeLoader,
      slideTrigger,
      setSlideTrigger,
    }),
    [pageTransitionState, canFadeIn, showHomeLoader, slideTrigger]
  );

  return (
    <TransitionContext.Provider value={contextValue}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('useTransition must be used within a TransitionGlobal');
  return context;
}
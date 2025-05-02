// component/TransitionProvider.tsx
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface TransitionContextProps {
  hasNavAnimatedIn: boolean;
  setNavAnimatedIn: () => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [hasNavAnimatedIn, setHasNavAnimatedInState] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('hasNavAnimatedIn');
    if (stored === 'true') setHasNavAnimatedInState(true);
  }, []);

  const setNavAnimatedIn = useCallback(() => {
    setHasNavAnimatedInState(true);
    sessionStorage.setItem('hasNavAnimatedIn', 'true');
  }, []);

  return (
    <TransitionContext.Provider value={{ hasNavAnimatedIn, setNavAnimatedIn }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('useTransition must be used within a TransitionProvider');
  return context;
}

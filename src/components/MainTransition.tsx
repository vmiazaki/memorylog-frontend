// component/MainTransition.tsx
'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function MainTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="flex-1 overflow-hidden"
    >
      {children}
    </motion.main>
  );
}

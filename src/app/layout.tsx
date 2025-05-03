// app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import { AppShell } from '@/components/AppShell';
import { TransitionGlobal } from '@/components/TransitionGlobal';
import { TransitionMain } from '@/components/TransitionMain';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Memorylog',
  description: 'A personal media archive',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <TransitionGlobal>
          <AppShell>
            <TransitionMain>{children}</TransitionMain>
          </AppShell>
        </TransitionGlobal>
      </body>
    </html>
  );
}

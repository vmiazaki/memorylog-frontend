// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AppShell } from '@/components/AppShell';
import { TransitionProvider } from '@/components/TransitionProvider';
import { MainTransition } from '@/components/MainTransition';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Memorylog',
  description: 'A personal media archive',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <TransitionProvider>
          <AppShell>
            <MainTransition>{children}</MainTransition>
          </AppShell>
        </TransitionProvider>
      </body>
    </html>
  );
}

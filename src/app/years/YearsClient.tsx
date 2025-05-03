// app/years/YearsClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Year } from '@/lib/global';

export default function YearsClient({ years }: { years: Year[] }) {
  usePageReady();

  return (
    <>
      <h1 className="text-2xl font-bold">Years</h1>
      <pre className="mt-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(years, null, 2)}
      </pre>
    </>
  );
}

// app/year/[slug]/YearClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Year } from '@/lib/global';

export default function YearClient({ year }: { year: Year }) {
  usePageReady();

  return (
    <>
      <h1 className="text-2xl font-bold">Year: {year.year}</h1>
      <pre className="mt-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(year, null, 2)}
      </pre>
    </>
  );
}

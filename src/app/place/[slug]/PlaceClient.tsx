// app/place/[slug]/PlaceClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Place } from '@/lib/global';

export default function PlaceClient({ place }: { place: Place }) {
  usePageReady();

  return (
    <>
      <h1 className="text-2xl font-bold">Place: {place.name}</h1>
      <pre className="mt-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(place, null, 2)}
      </pre>
    </>
  );
}

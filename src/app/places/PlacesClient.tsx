// app/places/PlacesClient.tsx (Client Component)

'use client';

import { usePageReady } from '@/lib/mounted';
import { Place } from '@/lib/global';

export default function PlacesClient({ places }: { places: Place[] }) {
  usePageReady();

  return (
    <>
      <h1 className="text-2xl font-bold">Places</h1>
      <pre className="mt-4 text-sm whitespace-pre-wrap">
        {JSON.stringify(places, null, 2)}
      </pre>
    </>
  );
}

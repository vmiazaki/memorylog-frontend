// app/places/page.tsx
import { getPlaces } from '@/lib/strapi';

export default async function PlacesPage() {
  const places = await getPlaces();

  return (
    <main>
      <h1>Places</h1>
      <pre>{JSON.stringify(places, null, 2)}</pre>
    </main>
  );
}
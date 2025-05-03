// app/places/page.tsx (Server Component)

import PlacesClient from './PlacesClient';
import { getPlaces } from '@/lib/strapi';

export default async function PlacesPage() {
  const places = await getPlaces();
  return <PlacesClient places={places} />;
}

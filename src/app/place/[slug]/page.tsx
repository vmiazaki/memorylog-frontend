// app/place/[slug]/page.tsx (Server Component)

import { getPlaceBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import PlaceClient from './PlaceClient';

export default async function PlacePage(props: { params: { slug: string } }) {
  const { params } = props;
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) return notFound();

  return <PlaceClient place={place} />;
}

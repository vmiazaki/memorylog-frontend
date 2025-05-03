// app/year/[slug]/page.tsx (Server Component)

import { getYearBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import YearClient from './YearClient';

export default async function YearPost(props: { params: { slug: string } }) {
  const { params } = props;
  const { slug } = await params;
  const year = await getYearBySlug(slug);

  if (!year) return notFound();

  return <YearClient year={year} />;
}

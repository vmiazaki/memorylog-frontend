// app/years/page.tsx (Server Component)

import YearsClient from './YearsClient';
import { getYears } from '@/lib/strapi';

export default async function YearsPage() {
  const years = await getYears();
  return <YearsClient years={years} />;
}

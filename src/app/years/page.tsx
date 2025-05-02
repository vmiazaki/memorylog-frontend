// app/years/page.tsx
import { getYears } from '@/lib/strapi';

export default async function YearsPage() {
  const years = await getYears();

  return (
    <main>
      <h1>Years</h1>
      <pre>{JSON.stringify(years, null, 2)}</pre>
    </main>
  );
}
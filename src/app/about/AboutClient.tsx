// about/AboutClient.tsx

'use client';

import { usePageReady } from '@/lib/mounted';

export default function AboutClient() {
  usePageReady();

  return (
    <>
      <h1 className="">About the Memorylog</h1>
      <p className="">
        This is a placeholder paragraph for the About page. You can update this section to describe your project, the inspiration behind it, or anything else relevant.
      </p>
    </>
  );
}

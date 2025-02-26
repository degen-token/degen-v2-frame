'use client';

import dynamic from 'next/dynamic';

const Demo = dynamic(() => import('@/components/Demo'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Demo />
    </main>
  );
}

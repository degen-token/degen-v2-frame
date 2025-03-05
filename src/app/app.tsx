'use client';

import dynamic from 'next/dynamic';

const Degen = dynamic(() => import('@/components/Degen'), {
  ssr: false,
});

export default function App() {
  return <Degen />;
}

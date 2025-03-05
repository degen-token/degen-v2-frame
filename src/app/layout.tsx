import clsx from 'clsx';
import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { protoMono } from '@/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Degen',
  description: 'We are the Decentralized Generation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx('antialiased bg-slate-900', protoMono.variable)}>
        <div className="font-mono dark">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

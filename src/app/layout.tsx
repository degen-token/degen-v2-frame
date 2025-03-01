import { protoMono } from '@/styles/fonts';
import type { Metadata } from 'next';
import './globals.css';

import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: 'Degen Official',
  description: 'We are the Decentralized Generation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${protoMono.variable} antialiased bg-slate-900`}>
        <div className="font-proto text-gray-300">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

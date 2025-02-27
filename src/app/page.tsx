import { Metadata } from 'next';
import App from './app';

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: 'next',
  imageUrl: `${appUrl}/image.gif`,
  button: {
    title: 'Open',
    action: {
      type: 'launch_frame',
      name: 'Degen',
      url: appUrl,
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: '#a855f7',
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Farcaster Frames v2 Demo',
    openGraph: {
      title: 'Farcaster Frames v2 Demo',
      description: 'A Farcaster Frames v2 demo app.',
    },
    other: {
      'fc:frame': JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}

import localFont from 'next/font/local';

export const protoMono = localFont({
  src: [
    {
      path: '/fonts/ProtoMono-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '/fonts/ProtoMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/ProtoMono-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-proto-mono',
});

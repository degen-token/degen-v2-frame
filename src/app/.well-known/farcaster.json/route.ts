export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        'eyJmaWQiOjE1OTgzLCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4NEFlNDlGMGFBNzYyRWZlYmVCZmY0YmFDNGVBMDg0N0ViNkFmNGVjOSJ9',
      payload: 'eyJkb21haW4iOiJhcHAuZGVnZW4udGlwcyJ9',
      signature:
        'MHg2ZDM2MzAzODAzYmRhZjQ5ZjY5YjQ2YmI2ZTU1ZTRlZmM4NzM5NTQ2YTA5YTYxZDY0YzZhNTAwYTkwMzM1NGNkNDFkNmI5YmJhNTgwZjQyZGQ3NDhhYWZjNDY3OWZiMjZmYmFhOWE5Yjc4MzE0MTg3M2M2OTQxMDJjNzI0NzAzMTFj',
    },
    frame: {
      version: '1',
      name: 'Degen Official',
      iconUrl: 'https://app.degen.tips/icon.png',
      homeUrl: 'https://app.degen.tips',
      imageUrl: 'https://app.degen.tips/image.png',
      buttonTitle: 'Check this out',
      splashImageUrl: 'https://app.degen.tips/splash.png',
      splashBackgroundColor: '#eeccff',
      webhookUrl: 'https://app.degen.tips/api/webhook',
    },
  };

  return Response.json(config);
}

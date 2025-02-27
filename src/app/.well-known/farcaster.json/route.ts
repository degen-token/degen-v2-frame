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
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/image.gif`,
      buttonTitle: 'Open',
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: '#a855f7',
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}

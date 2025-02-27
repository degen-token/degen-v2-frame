import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia, degen } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { frameConnector } from '@/lib/connector';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_URL),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_URL),
    [degen.id]: http(process.env.NEXT_PUBLIC_DEGEN_URL),
  },
  connectors: [frameConnector(), metaMask()],
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

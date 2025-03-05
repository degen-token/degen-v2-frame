import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Button } from '@/components/catalyst/button';
import { config } from '@/components/providers/WagmiProvider';

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  return (
    <Button
      outline
      onClick={() =>
        isConnected
          ? disconnect()
          : connect({ connector: config.connectors[2] })
      }
      className="flex items-center space-x-2 text-xs px-2 py-1 h-8"
    >
      {isConnected ? (
        <>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </>
      ) : (
        <>Connect</>
      )}
    </Button>
  );
}

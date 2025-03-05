import { type Context } from '@farcaster/frame-sdk';
import Image from 'next/image';
import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Button } from '@/components/catalyst/button';
import { config } from '@/components/providers/WagmiProvider';

export default function ConnectWalletButton() {
  const [context, setContext] = useState<Context.FrameContext>();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  return (
    <Button
      outline
      onClick={() =>
        isConnected
          ? disconnect()
          : connect({ connector: config.connectors[1] })
      }
      className="flex items-center space-x-2 text-xs px-2 py-1 h-8"
    >
      {isConnected ? (
        <>
          <Image
            src={context?.user.pfpUrl || '/default_pfp.jpg'}
            alt="Degen Profile"
            width={120}
            height={120}
            className="w-6 h-6 mr-2 rounded-xs border-2 border-slate-800/30 shadow-lg"
          />
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </>
      ) : (
        <>Connect</>
      )}
    </Button>
  );
}

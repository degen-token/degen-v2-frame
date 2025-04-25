import sdk, { type Context } from '@farcaster/frame-sdk';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Heading, Subheading } from '@/components/catalyst/heading';
import AirdropClaimButton from '@/components/ui/AirdropClaimButton';
import ConnectWalletButton from '@/components/ui/ConnectWalletButton';
import Container from '@/components/ui/Container';

export default function Degen() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);

      sdk.actions.ready();
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return (
    <Container>
      <div className="absolute top-4 right-4">
        <ConnectWalletButton />
      </div>

      {/* Airdrop Claim Section */}
      <motion.div
        className="w-11/12 max-w-md p-4 bg-slate-800/30 bg-opacity-70 border border-violet-500/30 text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <Heading>Airdrop</Heading>
        <Subheading className="animate-pulse">Season 15</Subheading>

        <AirdropClaimButton
          airdropContract="0ECD33F5d802A260F256f5d33256E284E8B1E562"
          merkleProofApi="https://api.degen.tips/airdrop2/season15/merkleproofs"
        />
      </motion.div>

      <motion.div
        className="w-11/12 max-w-md p-4 bg-slate-800/30 bg-opacity-70 border border-violet-500/30 text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <Heading>Raindrop</Heading>
        <Subheading className="animate-pulse">Season 6</Subheading>

        <AirdropClaimButton
          airdropContract="c1661419D7F6ee2F44a6bCaCf3b254544EcEF066"
          merkleProofApi="https://api.degen.tips/raindrop/season6/merkleproofs"
        />
      </motion.div>
    </Container>
  );
}

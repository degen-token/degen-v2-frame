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
        <Subheading className="animate-pulse">Season 17</Subheading>

        <AirdropClaimButton
          airdropContract="08e98F1136D7defC13D169FF7FBBb2FF998a42ab"
          merkleProofApi="https://api.degen.tips/airdrop2/season17/merkleproofs"
        />
      </motion.div>

      <motion.div
        className="w-11/12 max-w-md p-4 bg-slate-800/30 bg-opacity-70 border border-violet-500/30 text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <Heading>Raindrop</Heading>
        <Subheading className="animate-pulse">Season 7</Subheading>

        <AirdropClaimButton
          airdropContract="7fFC3dE659e608990CAc407297CC6fC54552746A"
          merkleProofApi="https://api.degen.tips/raindrop/season7/merkleproofs"
        />
      </motion.div>
    </Container>
  );
}

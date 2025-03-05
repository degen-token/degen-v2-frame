import sdk, { type Context } from '@farcaster/frame-sdk';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Heading, Subheading } from '@/components/catalyst/heading';
import AirdropClaimButton from '@/components/ui/AirdropClaimButton';
import ConnectWalletButton from '@/components/ui/ConnectWalletButton';
import Container from '@/components/ui/Container';

export default function Degen() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  const [showConfetti, setShowConfetti] = useState(false);

  const pfpUrl = context?.user.pfpUrl || '/default_pfp.jpg';

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
        <ConnectWalletButton pfpUrl={pfpUrl} />
      </div>

      {showConfetti && <Confetti numberOfPieces={500} recycle={true} />}

      {/* Airdrop Claim Section */}
      <motion.div
        className="w-11/12 max-w-md p-4 bg-slate-800/30 bg-opacity-70 border border-violet-500/30 text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <Heading>Airdrop</Heading>
        <Subheading className="animate-pulse">Season 13</Subheading>

        <AirdropClaimButton
          airdropContract="060f31a459D531987bEfd5a09c31B09946063cB3"
          merkleProofApi="https://api.degen.tips/airdrop2/season13/merkleproofs"
          isDegenChain={true}
        />
      </motion.div>
    </Container>
  );
}

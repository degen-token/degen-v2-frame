import sdk, { type Context } from '@farcaster/frame-sdk';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Heading } from '@/components/catalyst/heading';
import AirdropClaimButton from '@/components/ui/AirdropClaimButton';
import ConnectWalletButton from '@/components/ui/ConnectWalletButton';
import Container from '@/components/ui/Container';
import Footer from '@/components/ui/Footer';

export default function Degen() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  const [showConfetti, setShowConfetti] = useState(false);

  const claimAirdrop = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 30000);
  };

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
        {/* Wallet Button */}
        <ConnectWalletButton />
      </div>

      {showConfetti && <Confetti numberOfPieces={500} recycle={true} />}

      {/* Airdrop Claim Section */}
      <motion.div
        className="w-11/12 max-w-md p-4 bg-slate-800/30 bg-opacity-70 border border-slate-700/15 text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <Heading>Airdrop</Heading>
        <h2 className="text-xl font-extrabold mb-3 animate-pulse">Season 13</h2>

        <AirdropClaimButton
          airdropContract="060f31a459D531987bEfd5a09c31B09946063cB3"
          merkleProofApi="https://api.degen.tips/airdrop2/season13/merkleproofs"
          claimMessage="Airdrop 2 Season 13 rewards can be claimed until March 31, 2025."
          isDegenChain={true}
        />
      </motion.div>

      <Footer />
    </Container>
  );
}

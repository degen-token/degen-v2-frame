import sdk, { type Context } from '@farcaster/frame-sdk';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { config } from '@/components/providers/WagmiProvider';
import Container from '@/components/ui/Container';
import ButtonPrimary from '@/components/ui/ButtonPrimary';
import ButtonSecondary from '@/components/ui/ButtonSecondary';
import Footer from '@/components/ui/Footer';
import AirdropClaim from './ui/AirdropClaim';

export default function Degen() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

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
        <ButtonSecondary
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
            'Connect'
          )}
        </ButtonSecondary>
      </div>

      {showConfetti && <Confetti numberOfPieces={500} recycle={true} />}

      {/* Airdrop Claim Section */}
      <motion.div
        className="w-11/12 max-w-md p-4 bg-slate-800/30 bg-opacity-70 border border-slate-800 text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-4xl text-neutral-200 font-extrabold mb-2">
          Airdrop
        </h2>
        <h2 className="text-xl font-extrabold mb-3 animate-pulse">Season 13</h2>
        <p className="mb-4">
          Thank you for being part of this degen ride. Keep tipping, keep having
          fun!
        </p>

        <AirdropClaim
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

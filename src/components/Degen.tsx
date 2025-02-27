import Footer from '@/components/ui/Footer';
import sdk, { type Context } from '@farcaster/frame-sdk';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function Demo() {
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
    <div className="min-h-screen flex flex-col items-center justify-center text-white animate-gradient-x bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 overflow-hidden w-full max-w-screen-sm mx-auto">
      {showConfetti && <Confetti numberOfPieces={500} recycle={true} />}

      {/* Profile Picture */}
      <motion.div
        className="mb-8"
        animate={{ scale: [0.8, 1.2, 1] }}
        transition={{ duration: 2.0 }}
      >
        <Image
          src={context?.user.pfpUrl || '/default-profile.png'}
          alt="Degen Profile"
          width={120}
          height={120}
          className="rounded-full border-4 border-white shadow-lg"
        />
      </motion.div>

      {/* Airdrop Claim Section */}
      <motion.div
        className="w-11/12 max-w-md p-4 bg-black bg-opacity-70 rounded-lg shadow-2xl text-center mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-3xl font-extrabold mb-3 animate-pulse">
          Airdrop Claim
        </h2>
        <p className="mb-4 text-sm">
          Claim your daily airdrop and level up your degen power!
        </p>
        <motion.button
          className="w-full py-2 bg-white text-black font-extrabold rounded-full animate-bounce hover:animate-none transition transform hover:scale-105"
          onClick={claimAirdrop}
        >
          Claim Airdrop 🚀
        </motion.button>
      </motion.div>

      <Footer />

      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </div>
  );
}

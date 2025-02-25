import sdk from '@farcaster/frame-sdk';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white animate-gradient-x bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      {/* Profile Picture */}
      <div className="mb-8">
        <Image
          src="https://avatars.githubusercontent.com/u/95072960?v=4"
          alt="Degen Profile"
          width={150}
          height={150}
          className="rounded-full border-4 border-white"
        />
      </div>

      {/* Airdrop Claim Section */}
      <div className="w-11/12 max-w-md p-6 bg-black bg-opacity-50 rounded-lg shadow-lg text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Airdrop Claim</h2>
        <p className="mb-6">
          Claim your daily airdrop and level up your degen power!
        </p>
        <button className="w-full py-2 bg-white text-black font-bold rounded-full animate-pulse hover:animate-none transition">
          Claim Airdrop 🚀
        </button>
      </div>

      {/* The Degen Relic Tag Game Section */}
      <div className="w-11/12 max-w-md p-6 bg-black bg-opacity-50 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">The Degen Relic Tag Game</h2>
        <p className="mb-4 text-sm">
          Every 24 hours, <span className="font-bold">The Degen Relic</span> is
          up for grabs!
        </p>
        <div className="mb-4 text-left text-xs">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Anyone can steal it by paying DEGEN, but the price increases by
              20% each time.
            </li>
            <li>
              A portion of each steal is distributed back to:
              <ul className="list-decimal pl-5">
                <li>The last person who held it before the steal.</li>
                <li>Yesterday’s final holder.</li>
                <li>All past holders (tiered profit-sharing).</li>
                <li>The protocol (burn or treasury).</li>
              </ul>
            </li>
            <li>
              Whoever holds it at the end of the round gets extra rewards!
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <p className="font-bold">
            Current Price: <span>100 DEGEN</span>
          </p>
          <p className="font-bold">
            Current Holder: <span>DegenWarrior</span>
          </p>
        </div>
        <button className="w-full py-2 bg-green-400 text-black font-bold rounded-full hover:bg-green-500 transition">
          Steal the Relic
        </button>
      </div>

      {/* Engagement Message */}
      <div className="mt-8 text-center text-sm">
        <p>Come back every day for fresh rewards, surprises, and meme magic!</p>
        <p className="italic mt-2">"Stay meme, stay degen!"</p>
      </div>

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
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </div>
  );
}

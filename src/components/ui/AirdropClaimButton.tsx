import useSWR from 'swr';

import { CSSProperties } from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWriteContract,
} from 'wagmi';
import { base } from 'wagmi/chains';

import degenAirdrop1Abi from '@/abis/DegenAirdrop1.json';
import { Button } from '@/components/catalyst/button';
import { Text } from '@/components/catalyst/text';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const canvasStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

export default function AirdropClaimButton({
  airdropContract,
  merkleProofApi,
}: {
  airdropContract: string;
  merkleProofApi: string;
}) {
  const { isConnected, address } = useAccount();

  const { data: airdrop1Proof } = useSWR(
    `${merkleProofApi}?wallet=${address}`,
    fetcher
  );

  let merkleIndex = 999999;
  let merkleProof;
  let merkleAmount;
  let merkleWallet;
  if (airdrop1Proof && airdrop1Proof[0]) {
    merkleIndex = airdrop1Proof[0].index;
    merkleWallet = airdrop1Proof[0].wallet_address;
    merkleProof = airdrop1Proof[0].proof;
    merkleAmount = airdrop1Proof[0].amount;
  }

  const { data: isClaimed } = useReadContract({
    address: `0x${airdropContract}`,
    abi: degenAirdrop1Abi,
    functionName: 'isClaimed',
    args: [merkleIndex.toString()],
  });

  const { data, error } = useSimulateContract({
    address: `0x${airdropContract}`,
    abi: degenAirdrop1Abi,
    functionName: 'claim',
    chainId: base.id,
    args: [merkleIndex, merkleWallet, merkleAmount, merkleProof],
  });

  const {
    data: hash,
    error: contractError,
    status,
    writeContract,
  } = useWriteContract();

  return (
    <div className="flex min-w-full flex-col items-center py-4 space-y-4">
      {!isConnected && (
        <>
          <Text>Connect your wallet to claim your rewards!</Text>
        </>
      )}

      {isClaimed && <Text>You&apos;ve already claimed your rewards.</Text>}

      {isConnected && airdrop1Proof && !airdrop1Proof[0] && (
        <Text>
          We couldn&apos;t find any rewards linked to your wallet at this time.
        </Text>
      )}

      {isConnected &&
        status == 'success' &&
        airdrop1Proof &&
        airdrop1Proof[0] &&
        data && (
          <>
            <Text>You&apos;ve successfully claimed your rewards!</Text>
            <Fireworks autorun={{ speed: 1 }} style={canvasStyles} />
          </>
        )}

      {isConnected &&
        status != 'success' &&
        !isClaimed &&
        airdrop1Proof &&
        airdrop1Proof[0] && (
          <>
            <Button
              color="violet"
              onClick={() => {
                writeContract(data!.request);
              }}
            >
              Claim
            </Button>
          </>
        )}
    </div>
  );
}

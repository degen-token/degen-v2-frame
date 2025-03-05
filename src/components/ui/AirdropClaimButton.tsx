'use client';

import { CSSProperties } from 'react';
import useSWR from 'swr';

import degenAirdrop1Abi from '@/abis/DegenAirdrop1.json';
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useSwitchChain,
  useWriteContract,
} from 'wagmi';
import { base, baseSepolia, degen } from 'wagmi/chains';

import { Text, TextLink } from '@/components/catalyst/text';
import { Button } from '@/components/catalyst/button';

const BASESCAN_URL = 'https://basescan.org/tx/';
const DEGEN_EXPLORER_URL = 'https://explorer.degen.tips/tx/';

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
  claimMessage,
  isDegenChain = false,
}: {
  airdropContract: string;
  merkleProofApi: string;
  claimMessage: string;
  isDegenChain?: boolean;
}) {
  const { isConnected, address } = useAccount();
  const { switchChain } = useSwitchChain();

  const { data: airdrop1Proof } = useSWR(
    `${merkleProofApi}?wallet=${address}`,
    fetcher
  );

  var merkleIndex = 999999;
  var merkleProof;
  var merkleAmount;
  var merkleWallet;
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
    chainId: isDegenChain ? degen.id : base.id,
    args: [merkleIndex, merkleWallet, merkleAmount, merkleProof],
  });

  console.log(error);
  console.log(data);

  const { data: hash, status, writeContract } = useWriteContract();

  return (
    <div className="flex min-w-full flex-col items-center py-4 space-y-4">
      {!isConnected && (
        <>
          <Text>Connect your wallet to claim your rewards!</Text>
          <Text>{claimMessage}</Text>
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
            <Text className="pt-8">
              <TextLink
                href={
                  isDegenChain
                    ? `${DEGEN_EXPLORER_URL}${hash}`
                    : `${BASESCAN_URL}${hash}`
                }
                target="_blank"
              >
                You&apos;ve successfully claimed your rewards! View on{' '}
                {isDegenChain ? 'Degen Explorer' : 'BaseScan'}.
              </TextLink>
            </Text>
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
                switchChain({ chainId: isDegenChain ? degen.id : base.id });
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

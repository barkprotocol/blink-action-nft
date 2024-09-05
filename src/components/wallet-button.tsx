import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';

export default function WalletButton() {
  const { connected, connect, disconnect, wallet } = useWallet();

  return (
    <Button onClick={() => (connected ? disconnect() : connect())}>
      {connected ? `Disconnect ${wallet?.adapter.name}` : 'Connect Wallet'}
    </Button>
  );
}

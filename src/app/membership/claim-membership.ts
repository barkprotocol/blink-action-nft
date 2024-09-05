import {
    PublicKey,
    TransactionInstruction,
    VersionedTransaction,
    TransactionMessage,
    ComputeBudgetProgram,
    SystemProgram
  } from '@solana/web3.js';
  import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
  import { createNoopSigner, publicKey, signerIdentity } from '@metaplex-foundation/umi';
  import { toWeb3JsInstruction, toWeb3JsKeypair } from '@solana/wallet-adapter-base';
  import { WalletConnectAdapter } from '@solana/wallet-adapter-walletconnect';
  
  // Create a devnet connection and Umi instance
  const umi = createUmi('https://api.devnet.solana.com');
  
  // Create and configure the WalletConnect adapter
  const wallet = new WalletConnectAdapter({
    options: {
      bridge: 'https://bridge.walletconnect.org',
    },
  });
  
  // Function to claim membership
  export const claimMembership = async (userAccount: PublicKey, membershipMint: PublicKey): Promise<VersionedTransaction> => {
    try {
      // Create a no-op signer using the user's public key
      const signer = createNoopSigner(publicKey(userAccount));
  
      // Set the user account as the payer
      umi.use(signerIdentity(signer));
  
      // Fetch the latest blockhash
      const { blockhash } = await umi.rpc.getLatestBlockhash();
  
      // Create the transaction instruction to claim membership (example logic for token transfer)
      const claimInstruction = new TransactionInstruction({
        keys: [
          { pubkey: userAccount, isSigner: true, isWritable: true }, // User's account
          { pubkey: membershipMint, isSigner: false, isWritable: true }, // Membership mint account
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // System program
          // Add other accounts involved in the claim process as needed
        ],
        programId: new PublicKey('gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR'), // Replace with actual token program ID
        data: Buffer.from([]), // Add data related to the claim process if necessary
      });
  
      // Create a VersionedMessage with instructions
      const message = new TransactionMessage({
        payerKey: userAccount,
        recentBlockhash: blockhash,
        instructions: [claimInstruction],
      }).compileToV0Message();
  
      // Create a VersionedTransaction
      const versionedTx = new VersionedTransaction(message);
  
      // Optionally: Add additional instructions if needed
      versionedTx.addInstruction(
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 1000,
        })
      );
  
      return versionedTx;
    } catch (error) {
      console.error('Error claiming membership:', {
        message: error.message,
        stack: error.stack,
      });
      throw new Error('Failed to claim membership');
    }
  };
  
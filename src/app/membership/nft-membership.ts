import {
  PublicKey,
  TransactionInstruction,
  VersionedTransaction,
  TransactionMessage,
  ComputeBudgetProgram,
} from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { generateSigner, publicKey, createNoopSigner, signerIdentity } from "@metaplex-foundation/umi";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mplCore } from "@metaplex-foundation/mpl-core";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { toWeb3JsInstruction, toWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com')
  .use(mplCore())
  .use(mplTokenMetadata())
  .use(irysUploader());

// Function to create a membership NFT
export const createMembership = async (account: PublicKey, metadataUri: string): Promise<VersionedTransaction> => {
  try {
    // Create a no-op signer using the account's public key
    const signer = createNoopSigner(publicKey(account));

    // Generate a mint keypair for the NFT
    const mint = generateSigner(umi);

    // Set the account as the payer
    umi.use(signerIdentity(signer));

    // Fetch the latest blockhash
    const { blockhash } = await umi.rpc.getLatestBlockhash();

    // Create the NFT transaction
    const tx = createNft(umi, {
      mint,
      payer: signer,
      name: "BARK - Membership NFT",
      uri: metadataUri, // Metadata URI provided by the uploadMetadata function
      sellerFeeBasisPoints: 500, // 5% seller fee
    });

    // Convert instructions to web3.js format
    const createdNftInstructions = tx.getInstructions();
    const solanaInstructions: TransactionInstruction[] = createdNftInstructions.map(toWeb3JsInstruction);

    // Create a VersionedMessage with instructions
    const message = new TransactionMessage({
      payerKey: account,
      recentBlockhash: blockhash,
      instructions: solanaInstructions,
    }).compileToV0Message();

    // Create a VersionedTransaction
    const versionedTx = new VersionedTransaction(message);
    const mintKeypair = toWeb3JsKeypair(mint);

    // Add signatures (signer + mint keypair)
    versionedTx.sign([mintKeypair]);

    // Optional: Add additional instructions if needed
    versionedTx.addInstruction(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      })
    );

    return versionedTx;
  } catch (error) {
    console.error("Error creating membership:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error("Failed to create membership transaction");
  }
};

// Function to get membership details
export const getMembershipDetails = async (account: PublicKey): Promise<any> => {
  try {
    // Retrieve metadata from the Solana blockchain
    const metadata = await fetchMetadataForAccount(account);

    if (!metadata) {
      throw new Error('Failed to retrieve metadata');
    }

    // Return the membership details
    return {
      account: account.toString(),
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      creators: metadata.creators.map(creator => ({
        address: creator.address.toBase58(),
        verified: creator.verified,
        share: creator.share,
      })),
      attributes: metadata.attributes.map(attribute => ({
        trait_type: attribute.trait_type,
        value: attribute.value,
      })),
      description: metadata.description,
      external_url: metadata.external_url,
      image: metadata.image,
      website_url: metadata.website_url,
      x_url: metadata.x_url,
      animation_url: metadata.animation_url,
      telegram_url: metadata.telegram_url,
    };
  } catch (error) {
    console.error("Error retrieving membership details:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error("Failed to retrieve membership details");
  }
};

// Helper function to fetch metadata from Solana blockchain
const fetchMetadataForAccount = async (account: PublicKey): Promise<any> => {
  try {
    // Get the PDA for the metadata account
    const metadataPDA = await Metadata.getPDA(account);

    // Fetch the metadata account data
    const metadataAccount = await connection.getAccountInfo(metadataPDA);

    if (!metadataAccount || !metadataAccount.data) {
      throw new Error('Metadata account not found');
    }

    // Deserialize the metadata account data
    const metadata = Metadata.deserialize(metadataAccount.data);

    return metadata.data;
  } catch (error) {
    console.error('Error fetching metadata:', {
      message: error.message,
      stack: error.stack,
    });
    return null;
  }
};

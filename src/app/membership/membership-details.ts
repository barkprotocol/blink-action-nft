import { PublicKey, Connection } from '@solana/web3.js';
import { Metadata, MetadataDataData } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createNoopSigner, publicKey, signerIdentity } from '@metaplex-foundation/umi';

// Create a devnet connection and Umi instance
const connection = new Connection('https://api.devnet.solana.com');
const umi = createUmi('https://api.devnet.solana.com');

// Function to get metadata for a given mint address
const getMetadataForMint = async (mint: PublicKey): Promise<MetadataDataData | null> => {
  try {
    // Get the PDA for the metadata account
    const metadataPDA = await Metadata.getPDA(mint);

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

// Function to get membership details
export const getMembershipDetails = async (membershipMint: PublicKey): Promise<any> => {
  try {
    // Fetch the metadata for the membership mint
    const metadata = await getMetadataForMint(membershipMint);

    if (!metadata) {
      throw new Error('Failed to retrieve metadata');
    }

    // Return the membership details
    return {
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
    console.error('Error retrieving membership details:', {
      message: error.message,
      stack: error.stack,
    });
    throw new Error('Failed to retrieve membership details');
  }
};

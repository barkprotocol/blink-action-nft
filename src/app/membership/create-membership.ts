import { Router } from 'express';
import { PublicKey } from '@solana/web3.js';
import { uploadMetadata } from './nft/nft_metadata';
import { nftMint } from './nft/nft_mint';
import { body, validationResult } from 'express-validator';

// Create a new router instance
const router = Router();

// Middleware to validate and sanitize input
const validateCreateMembership = [
  body('account')
    .notEmpty().withMessage('Account is required')
    .isString().withMessage('Account must be a string')
    .custom(value => {
      try {
        new PublicKey(value); // Validate if it's a valid PublicKey
        return true;
      } catch {
        throw new Error('Invalid account public key');
      }
    }),
  body('imageUri')
    .notEmpty().withMessage('Image URI is required')
    .isURL().withMessage('Image URI must be a valid URL'),
];

// Route to create a new membership NFT
router.post('/create-membership', validateCreateMembership, async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { account, imageUri } = req.body;

  try {
    // Upload metadata and get the URI
    const metadataUri = await uploadMetadata(imageUri);

    // Create the NFT
    const accountPublicKey = new PublicKey(account);
    const versionedTransaction = await nftMint(accountPublicKey, metadataUri);

    // Respond with the metadata URI and transaction details
    res.status(200).json({
      message: 'Membership NFT created successfully',
      metadataUri,
      transaction: versionedTransaction,
    });
  } catch (error) {
    // Enhanced error handling
    console.error('Error creating membership NFT:', {
      message: error.message,
      stack: error.stack,
    });
    
    // Communicate the error to the client
    res.status(500).json({ error: 'Failed to create membership NFT. Please try again later.' });
  }
});

export default router;

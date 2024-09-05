import { Router } from 'express';
import { PublicKey } from '@solana/web3.js';
import { createMembership, getMembershipDetails } from './nft-membership';

// Create a new router instance
const router = Router();

// Route to create a new membership
router.post('/create-membership', async (req, res) => {
  const { account, metadataUri } = req.body;

  if (!account || !metadataUri) {
    return res.status(400).json({ error: 'Account and metadata URI are required' });
  }

  try {
    const accountPublicKey = new PublicKey(account);
    const membership = await createMembership(accountPublicKey, metadataUri);
    res.status(200).json({ membership });
  } catch (error) {
    console.error('Error creating membership:', error);
    res.status(500).json({ error: 'Failed to create membership' });
  }
});

// Route to get membership details
router.get('/membership-details/:account', async (req, res) => {
  const { account } = req.params;

  try {
    const accountPublicKey = new PublicKey(account);
    const membershipDetails = await getMembershipDetails(accountPublicKey);
    res.status(200).json({ membershipDetails });
  } catch (error) {
    console.error('Error retrieving membership details:', error);
    res.status(500).json({ error: 'Failed to retrieve membership details' });
  }
});

export default router;

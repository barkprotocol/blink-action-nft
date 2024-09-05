import { Router, Request, Response, NextFunction } from 'express';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { handleStake } from '../services/stake';

// Initialize the router
const router = Router();
const connection = new Connection(clusterApiUrl('devnet'));

// Handle staking (POST)
router.post('/process', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount, stakeAccount, validator } = req.body;
    if (!amount || !stakeAccount || !validator) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const result = await handleStake(connection, { amount, stakeAccount, validator });
    if (result.success) {
      res.status(200).json({ message: 'Stake processed successfully', transactionSignature: result.transactionSignature });
    } else {
      res.status(400).json({ message: result.errorMessage || 'Failed to process stake' });
    }
  } catch (error) {
    next(error);
  }
});

// Handle staking status retrieval (GET)
router.get('/status/:stakeAccount', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stakeAccount = req.params.stakeAccount;
    if (!stakeAccount) {
      return res.status(400).json({ message: 'Missing stake account parameter' });
    }

    // Logic to retrieve staking status
    // Placeholder response
    res.status(200).json({ stakeAccount, status: 'Staked' }); // Example status
  } catch (error) {
    next(error);
  }
});

export default router;

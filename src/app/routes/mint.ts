import { Router, Request, Response, NextFunction } from 'express';
import { handleMint } from '../services/mint'; // Adjust the path as needed
import { MintRequest, MintResponse } from '../types'; // Adjust the path as needed

const router = Router();

// Handle minting (POST)
router.post('/process', async (req: Request<{}, {}, MintRequest>, res: Response, next: NextFunction) => {
  try {
    const { amount, mintAddress, recipientAddress } = req.body;
    // Create a connection (use environment variable or config)
    const connection = new Connection(process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com');

    const result: MintResponse = await handleMint({ amount, mintAddress, recipientAddress }, connection);

    if (result.success) {
      res.status(200).json({ message: 'Minting successful', transactionSignature: result.transactionSignature });
    } else {
      res.status(400).json({ message: 'Minting failed', errorMessage: result.errorMessage });
    }
  } catch (error) {
    next(error);
  }
});

// Handle mint status retrieval (GET)
router.get('/status/:transactionSignature', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionSignature = req.params.transactionSignature;
    // Create a connection (use environment variable or config)
    const connection = new Connection(process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com');

    // Example function to check transaction status
    const status = await connection.getTransaction(transactionSignature);

    if (status) {
      res.status(200).json({ transactionSignature, status });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;

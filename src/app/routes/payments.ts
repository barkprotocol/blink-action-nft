import express, { Request, Response, NextFunction } from 'express';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { transferSol, transferSPL } from '../services/payments';
import { TransferSolRequest, TransferSPLRequest } from '../services/types'; // Import types for validation

const router = express.Router();
const connection = new Connection(clusterApiUrl('devnet'));

// Middleware to validate request body
function validateTransferSolRequest(req: Request, res: Response, next: NextFunction) {
  const { amount, senderAddress, recipientAddress, senderKeypair } = req.body;
  if (typeof amount !== 'number' || !senderAddress || !recipientAddress || !senderKeypair) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid request data' });
  }
  next();
}

function validateTransferSPLRequest(req: Request, res: Response, next: NextFunction) {
  const { amount, senderAddress, recipientAddress, tokenMintAddress, senderKeypair } = req.body;
  if (typeof amount !== 'number' || !senderAddress || !recipientAddress || !tokenMintAddress || !senderKeypair) {
    return res.status(400).json({ success: false, errorMessage: 'Invalid request data' });
  }
  next();
}

// Route to handle SOL transfers
router.post('/transfer/sol', validateTransferSolRequest, async (req: Request, res: Response) => {
  try {
    const result = await transferSol(connection, req.body as TransferSolRequest);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: 'Internal server error' });
  }
});

// Route to handle SPL token transfers
router.post('/transfer/spl', validateTransferSPLRequest, async (req: Request, res: Response) => {
  try {
    const result = await transferSPL(connection, req.body as TransferSPLRequest);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, errorMessage: 'Internal server error' });
  }
});

export default router;

import express, { Request, Response, NextFunction } from 'express';
import next from 'next';
import { createServer } from 'http';
import path from 'path';

// Initialize Next.js app
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Create an Express server
const server = express();

// Middleware for logging requests
server.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware for parsing JSON and URL-encoded data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Serve static files (if needed)
server.use('/static', express.static(path.join(__dirname, 'public')));

// API routes
server.get('/api/mint', (req: Request, res: Response) => {
  res.json({ message: 'Mint API route!' });
});

// Mint Route example
server.get('/custom-route', (req: Request, res: Response) => {
  res.send('Mint route');
});

// Next.js pages handling
server.all('*', (req: Request, res: Response) => {
  return handle(req, res);
});

// Error handling middleware
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Create and start the HTTP server
const PORT = parseInt(process.env.PORT || '3000', 10);
createServer(server).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

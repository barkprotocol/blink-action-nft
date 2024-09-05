import { Router, Request, Response, NextFunction } from 'express';

// Define an interface for the settings
interface Settings {
  appName: string;
  environment: string;
  version: string;
  [key: string]: any; // To accommodate additional settings
}

// Dummy in-memory settings store (for demonstration)
const settings: Settings = {
  appName: 'MyApp',
  environment: 'development',
  version: '1.0.0',
};

const router = Router();

// Retrieve settings (GET)
router.get('/', (req: Request, res: Response) => {
  res.status(200).json(settings);
});

// Update settings (POST)
router.post('/update', (req: Request<{}, {}, Partial<Settings>>, res: Response, next: NextFunction) => {
  try {
    const newSettings = req.body;
    // Merge new settings with existing settings
    Object.assign(settings, newSettings);
    res.status(200).json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    next(error);
  }
});

export default router;

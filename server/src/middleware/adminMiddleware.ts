import { Request, Response, NextFunction } from 'express';

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    return res.status(403).json({ error: 'Not authenticated' });
  }

  if (req.currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'Admin only' });
  }

  next();
}

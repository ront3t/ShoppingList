import { Request, Response, NextFunction } from 'express';

// A custom interface for typed errors
export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`[ERROR]`, err);

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500
      ? 'Internal Server Error'
      : err.message || 'Something went wrong';

  res.status(statusCode).json({ error: message });
}

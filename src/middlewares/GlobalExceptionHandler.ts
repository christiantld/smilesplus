import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default function GlobalExceptionHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response<AppError | Error> {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}

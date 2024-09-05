import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_INTERNAL_SERVER_ERROR } from './const';
import winston from 'winston'; // Optional: for enhanced logging

// Custom Error Class for HTTP Errors
class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";

    // Ensure the stack trace is captured correctly
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Error Handler Middleware
const errorHandler = (
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Optionally, use a logger
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      // Add more transports like file logging if needed
    ],
  });

  if (err instanceof HttpError) {
    // Handle HTTP errors
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      // Optionally include an error code or additional details
      // errorCode: err.statusCode, 
      // details: err.details,
    });
  } else {
    // Handle general errors
    logger.error('Unexpected Error:', {
      message: err.message,
      stack: err.stack,
    });
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Internal Server Error',
      // Optionally include more details for debugging
      // details: err.message,
    });
  }
};

export { HttpError, errorHandler };

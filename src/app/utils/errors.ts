import { Request, Response, NextFunction } from 'express';

// Custom Error Class for HTTP Errors
export class HttpError extends Error {
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

// Custom Error Class for Not Found Errors
export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

// Custom Error Class for Validation Errors
export class ValidationError extends HttpError {
  constructor(message: string = "Invalid input") {
    super(message, 400);
    this.name = "ValidationError";
  }
}

// Custom Error Class for Unauthorized Access
export class UnauthorizedError extends HttpError {
  constructor(message: string = "Unauthorized access") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

// Custom Error Class for Forbidden Access
export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden access") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

// Custom Error Class for Internal Server Errors
export class InternalServerError extends HttpError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
    this.name = "InternalServerError";
  }
}

// Utility function to handle errors
export function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    // Handle HTTP errors
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    // Handle general errors
    console.error('Unexpected Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}

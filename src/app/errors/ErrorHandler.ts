import mongoose from 'mongoose';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

class ErrorHandler {
  public statusCode: number;
  public message: string;
  public errorSources: TErrorSources;

  /**
   * Constructor to initialize the error handler
   * @param err - The error object which can be of different types
   */
  constructor(
    err:
      | Error
      | mongoose.Error.ValidationError
      | mongoose.Error.CastError
      | ZodError
      | AppError,
  ) {
    this.statusCode = 500; // Default status code
    this.message = 'Something went wrong!'; // Default message
    this.errorSources = [
      {
        path: '',
        message: 'Something went wrong',
      },
    ]; // Default error source

    // Handle different types of errors
    if (err instanceof ZodError) {
      this.handleZodError(err);
    } else if (err instanceof mongoose.Error.ValidationError) {
      this.handleValidationError(err);
    } else if (err instanceof mongoose.Error.CastError) {
      this.handleCastError(err);
    } else if ((err as any).code === 11000) {
      this.handleDuplicateError(err);
    } else if (err instanceof AppError) {
      this.handleAppError(err);
    } else if (err instanceof Error) {
      this.handleGenericError(err);
    }
  }

  /**
   * Handle Zod validation errors
   * @param err - The Zod error object
   */
  private handleZodError(err: ZodError) {
    this.statusCode = 400; // Bad Request
    this.message = 'Validation Error';
    this.errorSources = err.errors.map(error => ({
      path: error.path[error.path.length - 1],
      message: error.message,
    }));
  }

  /**
   * Handle Mongoose validation errors
   * @param err - The Mongoose validation error object
   */
  private handleValidationError(err: mongoose.Error.ValidationError) {
    this.statusCode = 400; // Bad Request
    this.message = 'Validation Error';
    this.errorSources = Object.values(err.errors).map(
      (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
        path: error.path,
        message: error.message,
      }),
    );
  }

  /**
   * Handle Mongoose cast errors
   * @param err - The Mongoose cast error object
   */
  private handleCastError(err: mongoose.Error.CastError) {
    this.statusCode = 400; // Bad Request
    this.message = `Invalid ${err.path}: ${err.value}`;
    this.errorSources = [
      {
        path: err.path,
        message: `Invalid ${err.path}: ${err.value}`,
      },
    ];
  }

  /**
   * Handle Mongoose duplicate key errors
   * @param err - The duplicate key error object
   */
  private handleDuplicateError(err: any) {
    this.statusCode = 409; // Conflict
    const field = Object.keys(err.keyValue)[0];
    this.message = `Duplicate field value: ${field}. Please use another value!`;
    this.errorSources = [
      {
        path: field,
        message: `Duplicate field value: ${field}. Please use another value!`,
      },
    ];
  }

  /**
   * Handle custom application errors
   * @param err - The custom application error object
   */
  private handleAppError(err: AppError) {
    this.statusCode = err.statusCode;
    this.message = err.message;
    this.errorSources = [
      {
        path: err?.path || '',
        message: err.message,
      },
    ];
  }

  /**
   * Handle generic JavaScript errors
   * @param err - The generic error object
   */
  private handleGenericError(err: Error) {
    this.message = err.message;
    this.errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  /**
   * Get the formatted error response
   * @returns The error response object
   */
  public getErrorResponse(): TGenericErrorResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
      errorSources: this.errorSources,
    };
  }
}

export default ErrorHandler;

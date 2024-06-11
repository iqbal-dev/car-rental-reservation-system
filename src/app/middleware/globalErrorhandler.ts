import { ErrorRequestHandler } from 'express';
import config from '../config';
import ErrorHandler from '../errors/ErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorHandler = new ErrorHandler(err);

  const { statusCode, message, errorSources } = errorHandler.getErrorResponse();

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

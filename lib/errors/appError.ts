import { ErrorCodes } from './errorCodes';

export class AppError extends Error {
  errorCode: ErrorCodes;
  constructor(message: string, errorCode: ErrorCodes) {
    super(message);
    this.name = 'AppError';
    this.errorCode = errorCode;
  }
}

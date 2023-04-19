import { BasicHeader, BasicResult, Notifications } from '../types/baseTypes';
import { GeneralErrorResponse, GeneralExceptionResponse } from '../types/error';
import { Software } from '../types/navi';
import { TechnicalValidationMessagesType } from '../types/response';

export class GeneralError extends Error {
  header: BasicHeader;
  result: BasicResult;
  software: Software;
  technicalValidationMessages: TechnicalValidationMessagesType[];

  constructor(errorResponse: GeneralErrorResponse) {
    super(errorResponse.GeneralErrorResponse.result.message);
    this.name = 'GeneralError';
    this.header = errorResponse.GeneralErrorResponse.header;
    this.result = errorResponse.GeneralErrorResponse.result;
    this.software = errorResponse.GeneralErrorResponse.software;
    this.technicalValidationMessages = errorResponse.GeneralErrorResponse.technicalValidationMessages;
  }
}

export class GeneralException extends Error {
  funcCode: string;
  errorCode?: string;
  notifications: Notifications;

  constructor(exceptionResponse: GeneralExceptionResponse) {
    super(exceptionResponse.GeneralExceptionResponse.message);
    this.name = 'GeneralException';
    this.funcCode = exceptionResponse.GeneralExceptionResponse.funcCode;
    this.errorCode = exceptionResponse.GeneralExceptionResponse.errorCode;
    this.notifications = exceptionResponse.GeneralExceptionResponse.notifications;
  }
}

import { resSoftware, BasicHeader, BasicResult, Software } from '../../baseTypes';

import { TechnicalValidationMessagesType } from './response';

export type GeneralExceptionResponse = BasicResult;

export type GeneralErrorResponse = {
  header: BasicHeader;
  result: BasicResult;
  software: Software;
  technicalValidationMessages: TechnicalValidationMessagesType[];
};

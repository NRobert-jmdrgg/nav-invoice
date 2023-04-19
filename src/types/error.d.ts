import { resSoftware, BasicHeader, BasicResult } from './baseTypes';
import { Software } from '../navi';

import { TechnicalValidationMessagesType } from './response';

export type GeneralExceptionResponse = { GeneralExceptionResponse: BasicResult };

export type GeneralErrorResponse = {
  GeneralErrorResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    technicalValidationMessages: TechnicalValidationMessagesType[];
  };
};

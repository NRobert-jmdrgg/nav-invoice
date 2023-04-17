import { resSoftware, BasicHeader, BasicResult, Software } from '../../baseTypes';

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

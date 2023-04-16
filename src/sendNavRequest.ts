import axios from 'axios';
import { NaviOptions } from './navi';
import { GeneralErrorResponse, GeneralExceptionResponse } from './operations/types/error';
import { fixKnownArrays } from './utils/fixKnownArrays';
import readFromXml from './utils/readFromXml';

type Response<R> = R & {
  responseXml?: string;
  requestXml?: string;
};

/**
 *  Kérés küldése a nav felé.
 * @param request
 * @param operation api endpoint neve
 * @param returnWithXml ha igaz visszatér xml-el
 * @template R visszatérési érték típus
 * @returns Promise<Response<R>> válasz object
 *
 */
export default async function sendNavRequest<R>(
  requestXml: string,
  operation: string,
  options?: NaviOptions
): Promise<Response<R> | null> {
  // request küldés
  let data: R | undefined;
  let responseXml: string;
  const url = options?.testing
    ? 'https://api-test.onlineszamla.nav.gov.hu/invoiceService/'
    : 'https://api.onlineszamla.nav.gov.hu/invoiceService/';

  try {
    const config = {
      headers: { 'Content-Type': 'application/xml' },
      timeout: 70 * 1000,
    };

    const response = await axios.post(`${url}v3/${operation}`, requestXml, config);
    responseXml = response.data;

    const xmlobj = await readFromXml<R>(responseXml);
    data = xmlobj;

    return {
      ...data,
      responseXml: options?.returnWithXml ? responseXml : undefined,
      requestXml: options?.returnWithXml ? requestXml : undefined,
    };
  } catch (e: any) {
    if (e.response?.data) {
      if (e.response.data.includes('GeneralExceptionResponse')) {
        let exception = await readFromXml<GeneralExceptionResponse>(e.response.data);
        fixKnownArrays(exception, generalExceptionResponseKnownArrays);
        console.log(JSON.stringify(exception, null, 2));
        throw exception;
      } else if (e.response.data.includes('GeneralErrorResponse')) {
        const error = await readFromXml<GeneralErrorResponse>(e.response.data);
        fixKnownArrays(error, generalErrorResponseKnownArrays);
        console.log(JSON.stringify(error, null, 2));
        throw error;
      }
    } else {
      if (typeof e === 'object') {
        console.log(JSON.stringify(e, null, 2));
      } else {
        console.log(e);
      }
    }
    return null;
  }
}

const generalExceptionResponseKnownArrays = ['notifications.notification'];
const generalErrorResponseKnownArrays = ['technicalValidationMessages'];

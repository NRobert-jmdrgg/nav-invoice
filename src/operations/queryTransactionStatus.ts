import { User, Software } from '../baseTypes';
import createRequest from '../createNavRequest';
import { QueryTransactionStatusProps } from './types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTransactionStatusResponse } from './types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { fixKnownArrays } from '../utils/fixKnownArrays';
import { NaviOptions } from '../navi';

/**
 * A számlaadat-szolgáltatás feldolgozás aktuális állapotának és eredményének lekérdezésére szolgáló operáció
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns feldolgozás eredménye és result érték
 */
export default async function queryTransactionStatusRequest(
  user: User,
  software: Software,
  props: QueryTransactionStatusProps,
  options?: NaviOptions
): Promise<QueryTransactionStatusResponse | null> {
  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('QueryTransactionStatusRequest', user, software, props);
  const requestId = request['QueryTransactionStatusRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryTransactionStatusRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryTransactionStatusRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  const response = await sendNavRequest<QueryTransactionStatusResponse>(
    writeToXML(request),
    'queryTransactionStatus',
    options
  );

  fixKnownArrays(response, knownArrays);

  return response ?? null;
}

const orderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['transactionId', 'returnOriginalRequest'],
  },
];

const knownArrays = [
  'result.notifications.notification',
  'processsingResult.processingResult',
  'processsingResult.processingResult.technicalValidationMessages',
  'processsingResult.processingResult.businessValidationMessages',
  'processsingResult.processingResult.businessValidationMessages.pointer',
];

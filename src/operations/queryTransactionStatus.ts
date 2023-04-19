import createRequest from '../createNavRequest';
import { QueryTransactionStatusProps } from '../types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTransactionStatusResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { User, Software, NaviOptions } from '../types/navi';

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
): Promise<QueryTransactionStatusResponse> {
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
  try {
    const response = await sendNavRequest<QueryTransactionStatusResponse>(
      writeToXML(request),
      'queryTransactionStatus',
      knownArrays,
      options
    );

    return response;
  } catch (error) {
    throw error;
  }
}

const orderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['transactionId', 'returnOriginalRequest'],
  },
];

const knownArrays = [
  'QueryTransactionStatusResponse.result.notifications.notification',
  'QueryTransactionStatusResponse.processsingResult.processingResult',
  'QueryTransactionStatusResponse.processsingResult.processingResult.technicalValidationMessages',
  'QueryTransactionStatusResponse.processsingResult.processingResult.businessValidationMessages',
  'QueryTransactionStatusResponse.processsingResult.processingResult.businessValidationMessages.pointer',
];

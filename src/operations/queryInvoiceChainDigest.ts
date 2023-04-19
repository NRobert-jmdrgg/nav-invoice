import createRequest from '../createNavRequest';
import { QueryInvoiceChainDigestProps } from '../types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceChainDigestResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { NaviOptions, Software, User } from '../types/navi';

/**
 * Az operáció a megadott keresőfeltételeknek megfelelő, lapozható számlalistát ad vissza a válaszban. A lista elemei a megadott alapszámlához tartozó számlalánc elemei
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param props
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számlalánc és result érték
 */
export default async function queryInvoiceChainDigestRequest(
  user: User,
  software: Software,
  props: QueryInvoiceChainDigestProps,
  options?: NaviOptions
): Promise<QueryInvoiceChainDigestResponse> {
  // sorrend
  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('QueryInvoiceChainDigestRequest', user, software, props);
  const requestId = request['QueryInvoiceChainDigestRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryInvoiceChainDigestRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryInvoiceChainDigestRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  try {
    const response = await sendNavRequest<QueryInvoiceChainDigestResponse>(
      writeToXML(request),
      'queryInvoiceChainDigest',
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
    order: ['page', 'invoiceChainQuery'],
  },
  {
    path: 'invoiceChainQuery',
    order: ['invoiceNumber', 'invoiceDirection', 'taxNumber'],
  },
];

const knownArrays = [
  'QueryInvoiceChainDigestResponse.result.notifications.notification',
  'QueryInvoiceChainDigestResponse.invoiceChainDigestResult.invoiceChainElement',
  'QueryInvoiceChainDigestResponse.invoiceChainDigestResult.invoiceChainElement.invoiceLines.newCreatedLines',
];

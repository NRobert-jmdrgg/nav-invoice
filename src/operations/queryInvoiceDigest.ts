import createRequest from '../createNavRequest';
import { QueryInvoiceDigestProps } from '../types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceDigestResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { User, Software, NaviOptions } from '../types/navi';

/**
 * Üzleti keresőparaméterek alapján működő lekérdező operáció. Az operáció a megadott keresőfeltételeknek
megfelelő, lapozható számla listát ad vissza a válaszban. 
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számla lista és result érték
 */
export default async function queryInvoiceDigestRequest(
  user: User,
  software: Software,
  props: QueryInvoiceDigestProps,
  options?: NaviOptions
): Promise<QueryInvoiceDigestResponse> {
  // sorrend
  reOrder(props, orderSchema);

  // reqest létrehozása
  const request = createRequest('QueryInvoiceDigestRequest', user, software, props);
  const requestId = request['QueryInvoiceDigestRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryInvoiceDigestRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryInvoiceDigestRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  try {
    const response = await sendNavRequest<QueryInvoiceDigestResponse>(
      writeToXML(request),
      'queryInvoiceDigest',
      knownArrays,
      options
    );

    return response;
  } catch (error) {
    throw error;
  }
}

const orderSchema: OrderSchema[] = [
  { path: '', order: ['page', 'invoiceDirection', 'invoiceQueryParams'] },
  {
    path: 'invoiceQueryParams',
    order: ['mandatoryQueryParams', 'additionalQueryParams', 'relationalQueryParams', 'transactionQueryParams'],
  },
  {
    path: 'invoiceQueryParams.transactionQueryParams',
    order: ['transactionId', 'index', 'invoiceOperation'],
  },
  {
    path: 'invoiceQueryParams.relationalQueryParams',
    order: [
      'invoiceDelivery',
      'paymentDate',
      'invoiceNetAmount',
      'invoiceNetAmountHUF',
      'invoiceVatAmount',
      'invoiceVatAmountHUF',
    ],
  },
  { path: 'invoiceQueryParams.relationalQueryParams.mandatoryQueryParams', order: ['queryOperator', 'queryValue'] },
  { path: 'invoiceQueryParams.relationalQueryParams.additionalQueryParams', order: ['queryOperator', 'queryValue'] },
  { path: 'invoiceQueryParams.relationalQueryParams.relationalQueryParams', order: ['queryOperator', 'queryValue'] },
  { path: 'invoiceQueryParams.relationalQueryParams.transactionQueryParams', order: ['queryOperator', 'queryValue'] },
  {
    path: 'invoiceQueryParams.additionalQueryParams',
    order: [
      'taxNumber',
      'groupMemberTaxNumber',
      'name',
      'invoiceCategory',
      'paymentMethod',
      'invoiceAppearance',
      'source',
      'curreyncy',
    ],
  },
  {
    path: 'invoiceQueryParams.mandatoryQueryParams',
    order: ['invoiceIssueDate', 'insDate', 'originalInvoiceNumber'],
  },
  {
    path: 'invoiceQueryParams.mandatoryQueryParams.invoiceIssueDate',
    order: ['dateFrom', 'dateTo'],
  },
];

const knownArrays = [
  'QueryInvoiceDigestResponse.result.notifications.notification',
  'QueryInvoiceDigestResponse.invoiceDigestResult.invoiceDigest',
];

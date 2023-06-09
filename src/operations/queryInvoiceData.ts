import createRequest from '../createNavRequest';
import { QueryInvoiceDataProps } from '../types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceDataResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { NaviOptions, Software, User } from '../types/navi';

/**
 * Egy számlaszám alapján működő lekérdező operáció. Az operáció a megadott számlaszám teljes adattartalmát adja
vissza a válaszban.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számla adatok és result érték
 */
export default async function queryInvoiceDataRequest(
  user: User,
  software: Software,
  props: QueryInvoiceDataProps,
  options?: NaviOptions
): Promise<QueryInvoiceDataResponse> {
  // sorrend
  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('QueryInvoiceDataRequest', user, software, props);
  const requestId = request['QueryInvoiceDataRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryInvoiceDataRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryInvoiceDataRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  try {
    const response = await sendNavRequest<QueryInvoiceDataResponse>(
      writeToXML(request),
      'queryInvoiceData',
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
    path: 'invoiceNumberQuery',
    order: ['invoiceNumber', 'invoiceDirection', 'batchIndex', 'supplierTaxNumber'],
  },
];

const knownArrays = ['QueryInvoiceDataResponse.result.notifications.notification'];

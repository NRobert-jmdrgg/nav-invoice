import { User, Software } from '../baseTypes';
import createRequest from '../createNavRequest';
import { QueryInvoiceCheckProps } from './types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceCheckResponse } from './types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
// import { fixKnownArrays } from '../utils/fixKnownArrays';
import { NaviOptions } from '../navi';

/**
 * Számlaszám alapján működő lekérdező operáció. Az operáció a megadott számlaszámról szóló adatszolgáltatás
létezését ellenőrzi a rendszerben, a számla teljes adattartalmának visszaadása nélkül.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns adatszolgáltatás létezik-e és result érték
 */
export default async function queryInvoiceCheckRequest(
  user: User,
  software: Software,
  props: QueryInvoiceCheckProps,
  options?: NaviOptions
): Promise<QueryInvoiceCheckResponse> {
  // sorrend
  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('QueryInvoiceCheckRequest', user, software, props);
  const requestId = request['QueryInvoiceCheckRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryInvoiceCheckRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryInvoiceCheckRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  try {
    const response = await sendNavRequest<QueryInvoiceCheckResponse>(
      writeToXML(request),
      'queryInvoiceCheck',
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

const knownArrays = ['QueryInvoiceCheckResponse.result.notifications.notification'];

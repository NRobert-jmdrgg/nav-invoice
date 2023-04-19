import createRequest from '../createNavRequest';
import { QueryTransactionListProps } from '../types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTransactionListResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { NaviOptions, Software, User } from '../types/navi';
// import { fixKnownArrays } from '../utils/fixKnownArrays';

/**
 * a kérésben megadott időintervallumban, a technikai felhasználóhoz tartozó
adószámhoz beküldött számlaadat-szolgáltatások listázására szolgál.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számlaadat lista és result érték
 */
export default async function queryTransactionListRequest(
  user: User,
  software: Software,
  props: QueryTransactionListProps,
  options?: NaviOptions
): Promise<QueryTransactionListResponse> {
  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('QueryTransactionListRequest', user, software, props);
  const requestId = request['QueryTransactionListRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryTransactionListRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryTransactionListRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  try {
    const response = await sendNavRequest<QueryTransactionListResponse>(
      writeToXML(request),
      'queryTransactionList',
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
    order: ['page', 'insDate', 'requestStatus'],
  },
  {
    path: 'insDate',
    order: ['dateTimeFrom', 'dateTimeTo'],
  },
];

const knownArrays = [
  'QueryTransactionListResponse.result.notifications.notification',
  'QueryTransactionListResponse.transactionListResult.transaction',
];
0;

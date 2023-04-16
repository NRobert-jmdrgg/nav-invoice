import { User, Software } from '../baseTypes';
import createRequest from '../createNavRequest';
import { ManageInvoiceProps } from './types/requestProps';
import { Operation } from '../utils/createRequestSignature';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { ManageInvoiceResponse } from './types/response';
import writeToXML from '../utils/writeToXML';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { fixKnownArrays } from '../utils/fixKnownArrays';
import { NaviOptions } from '../navi';

/**
 * A számlaadat-szolgáltatás beküldésére szolgáló operáció, ezen keresztül van
lehetőség számla, módosító vagy stornó számlaadat-szolgáltatást a NAV-nak beküldeni.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param props
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns transactionId és result érték
 */
export default async function manageInvoiceRequest(
  user: User,
  software: Software,
  props: ManageInvoiceProps,
  options?: NaviOptions
): Promise<ManageInvoiceResponse | null> {
  // sorrend
  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('ManageInvoiceRequest', user, software, props);
  const requestId = request['ManageInvoiceRequest']['common:header']['common:requestId'];
  const timestamp = request['ManageInvoiceRequest']['common:header']['common:timestamp'];
  // request signature létrehozása
  request['ManageInvoiceRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey,
    props.invoiceOperations.invoiceOperation.map(
      (invoiceOperation) =>
        <Operation>{
          operationType: invoiceOperation.invoiceOperation,
          base64data: invoiceOperation.invoiceData,
        }
    )
  );

  const response = await sendNavRequest<ManageInvoiceResponse>(writeToXML(request), 'manageInvoice', options);
  fixKnownArrays(response, knownArrays);

  return response ?? null;
}

const orderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['exchangeToken', 'invoiceOperations'],
  },
  {
    path: 'options.invoiceOperations.invoiceOperation',
    order: ['index', 'invoiceOperation', 'invoiceData', 'electronicInvoiceHash'],
  },
  {
    path: 'options.invoiceOperations',
    order: ['compressedContent', 'invoiceOperation'],
  },
];

const knownArrays = ['result.notifications.notification'];

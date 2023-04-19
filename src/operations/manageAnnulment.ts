import { ManageAnnulmentProps } from '../types/requestProps';
import createRequest from '../createNavRequest';
import { createRequestSignature, Operation } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { ManageAnnulmentResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { InvoiceAnnulment } from '../types/invoiceAnnulment';
import { OrderSchema, reOrder } from '../utils/reOrder';
import { NaviOptions, Software, User } from '../types/navi';

/**
 * Technikai érvénytelenítések beküldésére szolgáló operáció
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param props
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns transactionId és result érték
 */
export async function manageAnnulmentRequest(
  user: User,
  software: Software,
  props: ManageAnnulmentProps,
  options?: NaviOptions
): Promise<ManageAnnulmentResponse> {
  // sorrend

  reOrder(props, orderSchema);

  // request létrehozása
  const request = createRequest('ManageAnnulmentRequest', user, software, props);
  const requestId = request['ManageAnnulmentRequest']['common:header']['common:requestId'];
  const timestamp = request['ManageAnnulmentRequest']['common:header']['common:timestamp'];

  // request signature generálás
  request['ManageAnnulmentRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey,
    props.annulmentOperations.annulmentOperation.map(
      (ao) =>
        <Operation>{
          operationType: ao.annulmentOperation,
          base64data: ao.invoiceAnnulment,
        }
    )
  );

  try {
    const response = await sendNavRequest<ManageAnnulmentResponse>(
      writeToXML(request),
      'manageAnnulment',
      knownArrays,
      options
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export type invoiceAnnulmentProps = {
  index: number;
  invoiceAnnulment: InvoiceAnnulment;
};

const orderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['exchangeToken', 'annulmentOperations'],
  },
  {
    path: 'options.annulmentOperations.annulmentOperation',
    order: ['index', 'annulmentOperation', 'invoiceAnnulment'],
  },
];

const knownArrays = ['ManageAnnulmentResponse.result.notifications.notification'];

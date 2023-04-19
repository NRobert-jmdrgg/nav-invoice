import createRequest from '../createNavRequest';
import { QueryTaxpayerProps } from '../types/requestProps';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTaxpayerResponse } from '../types/response';
import writeToXML from '../utils/writeToXML';
import { User, Software, NaviOptions } from '../types/navi';

/**
 * belföldi adószám validáló operáció, mely a számlakiállítás folyamatába építve képes
a megadott adószám valódiságáról és érvényességéről a NAV adatbázisa alapján adatot szolgáltatni.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns adószám adatai és result érték
 */
export default async function queryTaxpayerRequest(
  user: User,
  software: Software,
  props: QueryTaxpayerProps,
  options?: NaviOptions
): Promise<QueryTaxpayerResponse> {
  // request létrehozása
  const request = createRequest('QueryTaxpayerRequest', user, software, props);
  const requestId = request['QueryTaxpayerRequest']['common:header']['common:requestId'];
  const timestamp = request['QueryTaxpayerRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['QueryTaxpayerRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );
  try {
    const response = await sendNavRequest<QueryTaxpayerResponse>(
      writeToXML(request),
      'queryTaxpayer',
      knownArrays,
      options
    );
    return response;
  } catch (error) {
    throw error;
  }
}

const knownArrays = [
  'QueryTaxpayerResponse.result.notifications.notification',
  'QueryTaxpayerResponse.taxpayerData.taxpayerAddressList.taxpayerAddressItem',
];

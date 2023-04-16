import createRequest from '../createNavRequest.js';
import sendNavRequest from '../sendNavRequest.js';
import { createRequestSignature } from '../utils/createRequestSignature';
import { createDecipheriv } from 'crypto';
import { User, Software } from '../baseTypes';
import { TokenExchangeResponse } from './types/response.js';
import writeToXML from '../utils/writeToXML';
import { NaviOptions } from '../navi.js';

/**
 * A számlaadat-szolgáltatás beküldését megelőző egyszer használatos adatszolgáltatási token kiadását végző operáció.
 * @param user Technikai felhasználó adatai
 * @param software software adatok
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns exchange token
 */
export default async function tokenExchangeRequest(
  user: User,
  software: Software,
  options?: NaviOptions
): Promise<string | null> {
  // request létrehozása
  const request = createRequest('TokenExchangeRequest', user, software);
  const requestId = request['TokenExchangeRequest']['common:header']['common:requestId'];
  const timestamp = request['TokenExchangeRequest']['common:header']['common:timestamp'];

  // request signature létrehozása
  request['TokenExchangeRequest']['common:user']['common:requestSignature']._ = createRequestSignature(
    requestId,
    timestamp,
    user.signatureKey
  );

  const response = await sendNavRequest<TokenExchangeResponse>(writeToXML(request), 'tokenExchange', options);

  const encryptedToken = response?.encodedExchangeToken;

  // dekódolás
  // iv nem kell
  const decipher = createDecipheriv('aes-128-ecb', user.exchangeKey, null);

  let exchangeToken = '';
  // base64 -> utf8
  if (encryptedToken) {
    exchangeToken = decipher.update(encryptedToken, 'base64', 'utf8');
    exchangeToken += decipher.final('utf8');
  }

  return exchangeToken ?? null;
}

import { createHash } from 'crypto';
import formatIsoDate from './formatIsoDate';

/**
 * request signature létrehozása
 * @param requestId kérés idje
 * @param timestamp kérés ideje
 * @param signatureKey technikai felhasználó aláírókulcsa
 * @param operations a manageAnnulment vagy manageInvoice operációlistája
 * @return sha3-512 kódolt request signature
 */

export type Operation = {
  operationType: string;
  base64data: string;
};

export function createRequestSignature(
  requestId: string,
  timestamp: string,
  signatureKey: string,
  operations?: Operation[]
): string {
  let partialSignature = requestId + formatIsoDate(timestamp) + signatureKey;

  if (operations) {
    operations.forEach((operation) => {
      const hash = createHash('sha3-512');
      partialSignature += hash.update(`${operation.operationType}${operation.base64data}`).digest('hex').toUpperCase();
    });
  }

  const hash = createHash('sha3-512');
  const requestSignature = hash.update(partialSignature).digest('hex').toUpperCase();

  return requestSignature;
}

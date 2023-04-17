import makeid from './utils/makeid';
import { createHash } from 'crypto';
import { User, Software } from './baseTypes';
import { OrderSchema, reOrder } from './utils/reOrder';

/**
 * Request object
 * @param requestName a request neve (Az xml root)
 * @param user user adatokat tartalmazó object
 * @param software software adatokat tartalmazó object
 * @param options? A BasicOnlineInvoiceRequest kiegészítése
 * @returns InvoiceRequest object
 */
export default function createNavRequest(requestName: string, user: User, software: Software, props?: object) {
  const orderSchema: OrderSchema[] = [
    {
      path: '',
      order: [
        'softwareId',
        'softwareName',
        'softwareOperation',
        'softwareMainVersion',
        'softwareDevName',
        'softwareDevContact',
        'softwareDevCountryCode',
        'softwareDevTaxNumber',
      ],
    },
  ];

  reOrder(software, orderSchema);

  return {
    [requestName]: {
      '$xmlns:common': 'http://schemas.nav.gov.hu/NTCA/1.0/common',
      $xmlns: 'http://schemas.nav.gov.hu/OSA/3.0/api',

      'common:header': {
        'common:requestId': makeid(16),
        'common:timestamp': new Date().toISOString(),
        'common:requestVersion': '3.0',
        'common:headerVersion': '1.0',
      },
      'common:user': {
        'common:login': user.login,
        'common:passwordHash': {
          $cryptoType: 'SHA-512',
          _: createHash('sha512').update(user.password).digest('hex').toUpperCase(),
        },
        'common:taxNumber': user.taxNumber,
        'common:requestSignature': {
          $cryptoType: 'SHA3-512',
          _: '',
        },
      },
      software,
      ...props,
    },
  };
}

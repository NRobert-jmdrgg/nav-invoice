import { AnnulmentCodeType, InvoiceAnnulment } from '../operations/types/invoiceAnnulment';
import { utf8ToBase64 } from './base64';
import writeToXML from './writeToXML';

export default function createInvoiceAnnulment(
  annulmentReference: string,
  annulmentTimestamp: string,
  annulmentCode: AnnulmentCodeType,
  annulmentReason: string
): string {
  const invoiceAnnulment: InvoiceAnnulment = {
    InvoiceAnnulment: {
      '$xsi:schemaLocation': 'http://schemas.nav.gov.hu/OSA/3.0/data invoiceAnnulment.xsd',
      $xmlns: 'http://schemas.nav.gov.hu/OSA/3.0/annul',
      '$xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '$xmlns:common': 'http://schemas.nav.gov.hu/NTCA/1.0/common',
      '$xmlns:base': 'http://schemas.nav.gov.hu/OSA/3.0/base',
      annulmentReference: annulmentReference,
      annulmentTimestamp: annulmentTimestamp,
      annulmentCode: annulmentCode,
      annulmentReason: annulmentReason,
    },
  };

  const xml = writeToXML(invoiceAnnulment);

  return utf8ToBase64(xml);
}

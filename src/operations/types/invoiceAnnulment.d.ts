export type AnnulmentCodeType =
  | 'ERRATIC_DATA'
  | 'ERRATIC_INVOICE_NUMBER'
  | 'ERRATIC_INVOICE_ISSUE_DATE'
  | 'ERRATIC_ELECTRONIC_HASH_VALUE';

type Namespaces = {
  '$xsi:schemaLocation': 'http://schemas.nav.gov.hu/OSA/3.0/data invoiceAnnulment.xsd';
  $xmlns: 'http://schemas.nav.gov.hu/OSA/3.0/annul';
  '$xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance';
  '$xmlns:common': 'http://schemas.nav.gov.hu/NTCA/1.0/common';
  '$xmlns:base': 'http://schemas.nav.gov.hu/OSA/3.0/base';
};

export type InvoiceAnnulmentParams = {
  annulmentReference: string; // A technikai érvénytelenítéssel érintett számla vagy módosító okirat sorszáma
  annulmentTimestamp: string; // A technikai érvénytelenítés időbélyege a forrásrendszerben UTC idő szerint
  annulmentCode: AnnulmentCodeType; //A technikai érvénytelenítés kódja
  annulmentReason: string; // A technikai érvénytelenítés oka
};

export type invoiceAnnulmentObj = InvoiceAnnulmentParams & Namespaces;

export type InvoiceAnnulment = {
  InvoiceAnnulment: invoiceAnnulmentObj;
};

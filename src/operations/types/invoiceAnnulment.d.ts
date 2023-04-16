export type AnnulmentCodeType =
  | 'ERRATIC_DATA'
  | 'ERRATIC_INVOICE_NUMBER'
  | 'ERRATIC_INVOICE_ISSUE_DATE'
  | 'ERRATIC_ELECTRONIC_HASH_VALUE';

export type invoiceAnnulment = {
  annulmentReference: string; // A technikai érvénytelenítéssel érintett számla vagy módosító okirat sorszáma
  annulmentTimestamp: Date; // A technikai érvénytelenítés időbélyege a forrásrendszerben UTC idő szerint
  annulmentCode: AnnulmentCodeType; //A technikai érvénytelenítés kódja
  annulmentReason: string; // A technikai érvénytelenítés oka
};

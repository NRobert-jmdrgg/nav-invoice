/**
 * Operáció opció típusok
 */

export type annulmentOperation = {
  index: number; // A technikai érvénytelenítés pozíciója a kérésen belül
  annulmentOperation: 'ANNUL'; // A kért technikai érvénytelenítési művelet megjelölése
  invoiceAnnulment: string; // A technikai érvénytelenítés adatai BASE64 kódolásban
};

export type ManageAnnulmentProps = {
  exchangeToken: string; // Adatszolgáltatási token (tokenExchange)
  annulmentOperations: {
    annulmentOperation: annulmentOperation[];
  };
};

type InvoiceOperation = 'CREATE' | 'MODIFY' | 'STORNO';

export type InvoiceOperationObj = {
  index: number; // A számla pozíciója a kérésen belül
  invoiceOperation: InvoiceOperation; // A számlaművelet megjelölése
  invoiceData: string; // A számla adatai BASE64 kódolásban
  // Számlaállomány hash-lenyomata
  // Ha a completenessIndicator értéke true, az egyetlen elfogadott érték az SHA3-512.
  // Ha a completenessIndicator jelölő értéke false, az elfogadott értékek: SHA3-512, SHA-256.
  electronicInvoiceHash?: string;
};

export type ManageInvoiceProps = {
  exchangeToken: string; // Adatszolgáltatási token (tokenExchange)
  invoiceOperations: {
    compressedContent: boolean; // Tömörített tartalom jelzése a feldolgozási folyamat számára
    invoiceOperation: InvoiceOperationObj[];
  };
};

type InvoiceDirection = 'OUTBOUND' | 'INBOUND';

export type InvoiceChainQuery = {
  invoiceNumber: string; // A keresett számla száma
  invoiceDirection: InvoiceDirection; // A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
  taxNumber?: string; //A kiállító/vevő adószáma
};

export type QueryInvoiceChainDigestProps = {
  page: number; // A lekérdezni kívánt lap száma
  invoiceChainQuery: InvoiceChainQuery;
};

export type InvoiceNumberQuery = {
  invoiceNumber: string; // A keresett számla száma
  invoiceDirection: InvoiceDirection; // A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
  batchIndex?: string; // A módosító okirat sorszáma kötegelt módosítás esetén
  supplierTaxNumber?: string; // A kiállító adószáma vevő oldali keresés esetén;
};

export type QueryInvoiceCheckProps = {
  invoiceNumberQuery: InvoiceNumberQuery;
};

export type QueryInvoiceDataProps = {
  invoiceNumberQuery: InvoiceNumberQuery;
};

export type RelationQueryMonetary = {
  queryOperator: 'EQ' | 'GT' | 'GTE' | 'LT' | 'LTE'; // Relációs kereső operátor
  queryValue: string; // A keresett érték
};

export type InvoiceIssueDate = {
  dateFrom: string; // Számla kiállításának nagyobb vagy egyenlő keresőparamétere
  dateTo: string; // Számla kiállításának kisebb vagy egyenlő keresőparamétere
};

export type DateTimeIntervalParamType = {
  dateTimeFrom: Date; // Számla feldolgozásának időbélyeges, nagyobb vagy egyenlő keresőparamétere UTC idő szerint
  dateTimeTo: Date; // Számla feldolgozásának időbélyeges, kisebb vagy egyenlő keresőparamétere UTC idő szerint
};

export type MandatoryQueryParams =
  | ({ invoiceIssueDate: InvoiceIssueDate } & { insDate?: never } & { originalInvoiceNumber?: never })
  | ({ insDate: DateTimeIntervalParamType } & { invoiceIssueDate?: never } & { originalInvoiceNumber?: never })
  | ({ originalInvoiceNumber: string } & { invoiceIssueDate?: never } & { insDate?: never });

export type AdditionalQueryParams = {
  taxNumber?: string; // A számla kiállítójának vagy vevőjének adószáma;
  groupMemberTaxNumber?: string; // A számla kiállítójának vagy vevőjének csoporttag adószáma
  name?: string; // A számla kiállítójának vagy vevőjének keresőparamétere szó eleji egyezőségre
  invoiceCategory?: 'NORMAL' | 'SIMPLIFIED' | 'AGGREGATE'; // A számla típusa
  paymentMethod?: 'TRANSFER' | 'CASH' | 'CARD' | 'VOUCHER' | 'OTHER'; // Fizetés módja
  invoiceAppearance?: 'PAPER' | 'ELECTRONIC' | 'EDI' | 'UNKNOWN'; // A számla megjelenési formája
  source?: 'WEB' | 'XML' | 'MGM' | 'OPG'; // Az adatszolgálatás forrása
  curreyncy?: string; // A számla pénzneme
};

export type RelationalQueryParams = {
  invoiceDelivery?: RelationQueryMonetary;
  paymentDate?: RelationQueryMonetary;
  invoiceNetAmount?: RelationQueryMonetary;
  invoiceNetAmountHUF?: RelationQueryMonetary;
  invoiceVatAmount?: RelationQueryMonetary;
  invoiceVatAmountHUF?: RelationQueryMonetary;
};

export type TransactionQueryParams = {
  transactionId?: string; // A keresett tranzakció azonosítója
  index?: string; // A keresett számla sorszáma a tranzakción belül;
  invoiceOperation?: InvoiceOperation; // Számlaművelet keresőparamétere
};

export type InvoiceQueryParams = {
  mandatoryQueryParams: MandatoryQueryParams;
  additionalQueryParams?: AdditionalQueryParams;
  relationalQueryParams?: RelationalQueryParams;
  transactionQueryParams?: TransactionQueryParams;
};

export type QueryInvoiceDigestProps = {
  page: number; // A lekérdezni kívánt lap száma
  invoiceDirection: InvoiceDirection; // A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
  invoiceQueryParams: InvoiceQueryParams;
};

export type RequestStatus = 'RECEIVED' | 'PROCESSING' | 'SAVED' | 'FINISHED' | 'NOTIFIED';

export type QueryTransactionListProps = {
  page: number; // A lekérdezésre kívánt lap száma
  insDate: DateTimeIntervalParamType;
  requestStatus?: RequestStatus; // Az adatszolgáltatás maga az elektronikus számla
};

export type QueryTransactionStatusProps = {
  transactionId: string; // A lekérdezni kívánt tranzakció azonosítója
  returnOriginalRequest?: boolean; // Az eredeti tartalom lekérdezésének jelölője;
};

export type QueryTaxpayerProps = {
  taxNumber: string; // A lekérdezni kívánt magyar adószám első 8 jegye
};

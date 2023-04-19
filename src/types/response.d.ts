import { resSoftware, BasicHeader, BasicResult, Software } from './baseTypes';

/**
 * Nav válasz xml struktúrák
 */

export type xml = {
  responseXml?: string;
  requestXml?: string;
};

export type TokenExchangeResponse = {
  TokenExchangeResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    encodedExchangeToken: string; // Az elkódolt adatszolgáltatási token
    tokenValidityFrom: Date; //  Az adatszolgáltatási token érvényességének kezdete
    tokenValidityTo: Date; // Az adatszolgáltatási token érvényességének vége
  };
} & xml;

export type ManageAnnulmentResponse = {
  ManageAnnulmentResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    transactionId: string; // A befogadott adatszolgáltatás azonosítója
  };
} & xml;

export type ManageInvoiceResponse = {
  ManageInvoiceResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    transactionId: string; // A befogadott adatszolgáltatás azonosítója
  };
} & xml;

export type InvoiceChainDigestType = {
  invoiceNumber: string; // Számla vagy módosító okirat sorszáma
  batchIndex: number; // A módosító okirat sorszáma kötegelt módosítás esetén
  invoiceOperation: string; // Számlaművelet
  supplierTaxNumber: string; // Számla kiállítójának adószáma
  customerTaxNumber: string; // A vevő adószáma
  insDate: Date; // A számlaadat-szolgáltatás mentésének időpontja;
  originalRequestVersion: string; // Az adatszolgáltatás requestVersion értéke
};

export type InvoiceLinesType = {
  maxLineNumber: number; // A sorok száma közül a legmagasabb, amit a számla tartalmaz
  newCreatedLines: {
    lineNumberIntervalStart: number; // Hozzáadott számla sor intervallum kezdete
    lineNumberIntervalEnd: number; // Hozzáadott számla sor intervallum inkluzív vége
  }[];
};

export type InvoiceChainElementType = {
  invoiceChainDigest: InvoiceChainDigestType;
  invoiceLines?: InvoiceLinesType;
  invoiceReferenceData?: {
    originalInvoiceNumber: string; // Az eredeti számla sorszáma, amelyre a módosítás vonatkozik
    modifyWithoutMaster: boolean; // Alapszámla nélküli módosítás jelölése;
    modificationTimestamp?: Date; // A módosítás időbélyege
    modificationIndex?: number; // A számlára vonatkozó módosító okirat egyedi sorszáma
  };
};

export type QueryInvoiceChainDigestResponse = {
  QueryInvoiceChainDigestResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    InvoiceChainDigestResult: {
      currentPage: number; // A jelenleg lekérdezett lap értéke
      availablePage: number; // Az elérhető legnagyobb lap értéke
      invoiceChainElement: InvoiceChainElementType[];
    };
  };
} & xml;

export type QueryInvoiceCheckResponse = {
  QueryInvoiceCheckResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    invoiceCheckResult: boolean; // Az ellenőrzés logikai értékét tartalmazza
  };
} & xml;

export type QueryInvoiceDataResponse = {
  QueryInvoiceDataResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    invoiceDataResult?: {
      invoiceData: string; // A számla adatai BASE64 kódolásban;
      auditData: {
        insDate: Date; // A számlaadat-szolgáltatás mentésének időpontja
        insCusUser: string; // A számlaadat-szolgáltatást beküldő technikai felhasználó neve
        source: string; // A számlaadat-szolgáltatás forrása
        transactionId?: string; // A számlaadat-szolgáltatás tranzakcióazonosítója, ha az gépi interfészen került beküldésre
        index?: number; //  A számlaadat-szolgáltatás tranzakciójának indexe
        batchIndex?: number; // A módosító okirat száma a kötegen belül
        originalRequestVersion: string; // Az adatszolgáltatás requestVersion értéke
      };
      compressedContentIndicator: boolean; // Jelöli, ha az invoiceData tartalmát a BASE64 dekódolást követően még ki kell tömöríteni az olvasáshoz
      electronicInvoiceHash?: string; // Elektronikus számla- vagy módosító okirat állomány hash-lenyomata
    };
  };
} & xml;

export type InvoiceDigestType = {
  invoiceNumber: string; // Számla vagy módosító okirat sorszáma
  batchIndex?: number; // Számla vagy módosító okirat sorszáma
  invoiceOperation: string; // Számlaművelet típusa
  invoiceCategory: string; // Számla típusa
  invoiceIssueDate: Date; // Számla vagy módosító okirat kiállítási dátuma
  supplierTaxNumber: string; // Számla kiállítójának adószáma;
  supplierGroupMemberTaxNumber?: string; // Számla kiállítójának áfacsoport azonosító száma
  supplierName: string; // A számla kiállítójának neve;
  customerTaxNumber?: string; // A vevő adószáma
  customerGroupMemberTaxNumber?: string; // A vevő áfacsoport azonosító száma
  customerName?: string; // A vevő neve
  paymentMethod?: string; // Fizetési mód
  paymentDate?: Date; // Fizetési határidő
  invoiceAppearance?: string; // A számla megjelenési formája;
  source?: string; //  Az adatszolgáltatás forrása;
  invoiceDeliveryDate?: Date; // A számla teljesítési dátuma;
  currency?: string; // A számla pénzneme
  invoiceNetAmount?: number; // A számla nettó összege a számla pénznemében
  invoiceNetAmountHUF?: number; // A számla nettó összege forintban;
  invoiceVatAmount?: number; //  A számla áfa összege a számla pénznemében
  invoiceVatAmountHUF?: number; // A számla áfa összege forintban;
  transactionId?: string; // Az adatszolgáltatás tranzakcióazonosítója;
  index?: number; // A számla sorszáma a kérésen belül
  originalInvoiceNumber?: string; // Az eredeti számla sorszáma, amelyre a módosítás vonatkozik
  modificationIndex?: number; // A számlára vonatkozó módosító okirat egyedi sorszáma
  insDate: string; // A rendszerbe történő beérkezés időpontja UTC időben
  completenessIndicator?: boolean; // Az adatszolgáltatás maga az elektronikus számla
};

export type QueryInvoiceDigestResponse = {
  QueryInvoiceDigestResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    invoiceDigestResult: {
      currentPage: number; // A jelenleg lekérdezett lap értéke;
      availablePage: number; // Az elérhető legnagyobb lap értéke
      invoiceDigest?: InvoiceDigestType[];
    };
  };
} & xml;

export type TransactionType = {
  insDate: Date; // A számlaadat-szolgáltatás mentésének időpontja
  insCusUser: string; // A számlaadat-szolgáltatást beküldő technikai felhasználó neve
  source: string; // A számlaadat-szolgáltatás forrása
  transactionId: string; // A számlaadat-szolgáltatás tranzakcióazonosítója;
  requestStatus: string; // A tranzakció státusza
  technicalAnnulment: boolean; // Jelöli, hogy a tranzakció technikai érvénytelenítést tartalmaz
  originalRequestVersion: string; // A számlaadat-szolgáltatás requestVersion értéke
  itemCount: number; // A számlaadat-szolgáltatás tételeinek száma
};

export type QueryTransactionListResponse = {
  QueryTransactionListResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    transactionListResult: {
      currentPage: number; // A jelenleg lekérdezett lap értéke
      availablePage: number; // Az elérhető legnagyobb lap értéke
      transaction?: TransactionType[];
    };
  };
} & xml;

export type TechnicalValidationMessagesType = {
  validationResultCode: string; // Technikai validáció eredménye;
  validationErrorCode: string; // Validációs hibakód;
  message?: string; // Feldolgozási üzenet;
};

export type PointerType = {
  tag?: string; // Tag hivatkozás
  value?: string; //  Érték hivatkozás
  line?: number; // Sorhivatkozás
  originalInvoiceNumber?: string; // Kötegelt számla művelet esetén az eredeti számla sorszáma, melyre a módosítás vonatkozik
};

export type BusinessValidationMessagesType = {
  validationResultCode: string; // Üzleti validáció eredménye;
  validationErrorCode: string; // Validációs hibakód;
  message?: string; // Feldolgozási üzenet;
  pointer?: PointerType[];
};

export type ProcessingResultType = {
  index: number; // A számlaadatszolgáltatás; tranzakciójának indexe;
  batchIndex?: number; // Kötegelt módosítás esetén a számla sorszáma a kötegen belül
  invoiceStatus: string; //  A számla feldolgozási; státusza;
  technicalValidationMessages?: TechnicalValidationMessagesType[];
  businessValidationMessages?: BusinessValidationMessagesType[];
  compressedContent: boolean; // Jelöli, ha az originalRequest tartalmát a BASE64 dekódolást követően még ki kell tömöríteni az olvasáshoz;
  originalRequest?: string; // Az eredeti számlaadat;
};

export type QueryTransactionStatusResponse = {
  QueryTransactionStatusResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    processsingResult?: {
      processingResult: ProcessingResultType[];
      originalRequestVersion: string; // Az adatszolgáltatás; requestVersion értéke;
      annulmentData?: {
        annulmentVerificationStatus: string; // A technikai érvénytelenítő kérések jóváhagyási státusza
        annulmentDecisionDate?: Date; // A technikai érvénytelenítés jóváhagyásának vagy elutasításának időpontja UTC időben
        annulmentDecisionUser?: string; // A technikai érvénytelenítést jóváhagyó vagy elutasító felhasználó neve
      };
    };
  };
} & xml;

export type TaxpayerAddressItemType = {
  taxpayerAddressType: string; // Adózói címtípus
  taxpayerAddress: {
    countryCode: string; // Országkód ISO 3166 alpha-2 szabvány szerint
    region?: string; // Tartománykód ISO 3166 alpha-2 szabvány szerint
    postalCode: string; // Irányítószám
    city: string; // város
    streetName: string; // Közterület neve
    publicPlaceCategory: string; // Közterület jellege
    number?: string; // Házszám
    building?: string; // Épület
    staircase?: string; // Lépcsőház
    floor?: string; // Emelet
    door?: string; // Ajtó
    lotNumber?: string; // Helyrajzi szám
  };
};

export type QueryTaxpayerResponse = {
  QueryTaxpayerResponse: {
    header: BasicHeader;
    result: BasicResult;
    software: Software;
    infoDate?: Date; // A lekérdezett adószám utolsó változásának időpontja
    taxpayerValidity?: boolean; // A lekérdezett adószám érvényességének státusza (ha az adószám létezik)
    taxpayerData?: {
      taxpayerName: string; // A lekérdezett adózó neve
      taxpayerShortName?: string; // Az adózó rövid neve;
      taxNumberDetail: {
        taxpayerId: string; //Az adóalany adó törzsszáma;
        vatCode?: string; // Áfakód az adóalanyiság típusának jelzésére
        countyCode?: string; // Megyekód
      };

      incorporation: string; // Gazdasági típus
      vatGroupMembership?: string; // Az adózó áfacsoport tagsága
      taxpayerAddressList?: {
        taxpayerAddressItem: TaxpayerAddressItemType[];
      };
    };
  };
} & xml;

export type TaxNumberResponseType = {
  taxpayerId: string; // Az adóalany adó törzsszáma. Csoportos adóalany esetén csoportazonosító szám
  vatCode?: string; // Áfakód az adóalanyiság típusanak jelzésére. Egy számjegy
  countyCode?: string; // Megyekód, két számjegy
};

export type SimpleAddressResponseType = {
  countryCode: string; // Az országkód az ISO 3166 alpha-2 szabvány szerint
  region?: string; // Tartomány kódja (ha értelmezhető az adott országban) az ISO 3166-2 alpha 2 szabvány szerint
  postalCode: string; // Irányítószám (ha nem értelmezhető, 0000 értékkel kell kitölteni)
  city: string; // Település
  additionalAddressDetail: string; // További címadatok (például közterület neve és jellege, házszám, emelet, ajtó, helyrajzi szám, stb.)
};

export type DetailedAddressResponseType = {
  countryCode: string; // Az országkód ISO 3166 alpha-2 szabvány szerint
  region?: string; // Tartomány kódja (ha értelmezhető az adott országban) az ISO 3166-2 alpha 2 szabvány szerint
  postalCode: string; // Irányítószám (ha nem értelmezhető, 0000 értékkel kell kitölteni)
  city: string; // Település
  streetName: string; // Közterület neve
  publicPlaceCategory: string; // Közterület jellege
  number?: string; // Házszám
  building?: string; // Épület
  staircase?: string; // Lépcsőház
  floor?: string; // Emelet
  door?: string; // Ajtó
  lotNumber?: string; // Helyrajzi szám
};

export type AddressResponseType = {
  simpleAddress?: SimpleAddressResponseType;
  detailedAddress?: DetailedAddressResponseType;
};

export type CustomerVatDataResponseType = {
  customerTaxNumber: {
    taxpayerId: string; // Az adóalany adószámának törzsszáma. Csoportos adóalany esetén csoportazonosító szám
    vatCode?: string; // Áfakód az adóalanyiság típusanak jelzésére. Egy számjegy
    countyCode?: string; // Megyekód, két számjegy
    groupMemberTaxNumber?: TaxNumberResponseType;
  };
};

export type ConventionalInvoiceInfoResponseType = {
  orderNumbers: { orderNumber: string[] }; // Megrendelésszám
  deliveryNotes: { deliveryNote: string[] }; // Szállítólevél szám
  shippingDates: { shippingDate: string[] }; // Szállítási dátum
  contractNumbers: { contractNumber: string[] }; // Szerződésszám
  supplierCompanyCodes: { supplierCompanyCode: string[] }; // Az eladó vállalati kódja
  customerCompanyCodes: { customerCompanyCode: string[] }; // A vevő vállalati kódja
  dealerCodes: { dealerCode: string[] }; // Beszállító kód
  costCenters: { costCenter: string[] }; // Költséghely
  projectNumbers: { projectnumber: string[] }; // Projektszám
  generalLedgerAccountNumbers: { generalLedgerAccountNumber: string[] }; //Főkönyvi számlaszám
  glnNumbersSupplier: { glnNumber: string[] }; // Kiállítói globális helyazonosító szám
  glnNumbersCustomer: { glnNumber: string[] }; // Vevői globális helyazonosító szám;
  materialNumbers: { materialNumber: string[] }; // Anyagszám
  itemNumbers: { itemNumber: string[] }; // Cikkszám
  ekaerIds: { ekaerId: string[] }; // EKÁER azonosító
};

export type AdditionalDataResponseType = {
  dataName: string; // Az adatmező egyedi azonosítója
  dataDescription: string; // Az adatmező tartalmának szöveges leírása
  dataValue: string; // Az adat értéke
};

export type invoiceReferenceResponseType = {
  originalInvoiceNumber: string; // Az eredeti számla sorszáma, melyre a módosítás vonatkozik
  modifyWithoutMaster: boolean; // Annak jelzése, hogy a módosítás olyan alapszámlára hivatkozik, amelyről nem történt és nem is fog történni adatszolgáltatás
  modificationIndex: number; // A számlára vonatkozó módosító okirat egyedi sorszáma
};

export type SupplierInfoResponseType = {
  supplierTaxNumber: TaxNumberResponseType; // Belföldi adószám, amely alatt a számlán szereplő termékértékesítés vagy szolgáltatásnyújtás történt. Lehet csoportazonosító szám is.
  groupMemberTaxNumber?: TaxNumberResponseType; // Csoporttag adószáma, ha a termékértékesítés vagy szolgáltatásnyújtás csoportazonosító szám alatt történt
  communityVatNumber?: string; // Közösségi adószám
  supplierName: string; // Az eladó (szállító) neve
  supplierAddress: AddressResponseType; // Az eladó (szállító) címe
  supplierBankAccountNumber?: string; // Az eladó (szállító) bankszámlaszáma;
  individualExemption?: boolean; // Értéke true, ha a számlakibocsátó (eladó) alanyi áfamentes
  exciseLicenceNum?: string; // Az eladó adóraktári engedélyének vagy jövedéki engedélyének száma
};

export type CustomerVatStatusType = 'DOMESTIC' | 'OTHER' | 'PRIVATE_PERSON';

export type CustomerInfoResponseType = {
  customerVatStatus: CustomerVatStatusType; // Vevő áfa szerinti státusza
  customerVatData?: CustomerVatDataResponseType; // A vevő áfaalanyisági adatai
  customerName?: string; // A vevő neve
  customerAddress?: AddressResponseType; // A vevő címe
  customerBankAccountNumber?: string; // Vevő bankszámlaszáma
};

export type FiscalRepresentativeInfoResponseType = {
  fiscalRepresentativeTaxNumber: TaxNumberResponseType; // A pénzügyi képviselő adószáma
  fiscalRepresentativeName: string; // A pénzügyi képviselő neve
  fiscalRepresentativeAddress: AddressResponseType; // Pénzügyi képviselő címe
  fiscalRepresentativeBankAccountNumber?: string; // Pénzügyi képviselő által a számlakibocsátó (eladó) számára megnyitott bankszámla bankszámlaszáma
};

export type InvoiceCategoryType = 'NORMAL' | 'SIMPLIFIED' | 'AGGREGATE';

export type PaymentMethodType = 'TRANSFER' | 'CASH' | 'CARD' | 'VOUCHER' | 'OTHER';

export type InvoiceAppearanceType = 'PAPER' | 'ELECTRONIC' | 'EDI' | 'UNKNOWN';

export type InvoiceDetailResponseType = {
  invoiceCategory: InvoiceCategoryType; // A számla típusa, módosító okirat esetén az eredeti számla típusa
  invoiceDeliveryDate: Date; // Teljesítés dátuma (ha nem szerepel a számlán, akkor azonos a számla keltével)
  invoiceDeliveryPeriodStart?: Date; // Ha a számla egy időszakra vonatkozik, akkor az időszak első napja
  invoiceDeliveryPeriodEnd?: Date; // Ha a számla egy időszakra vonatkozik, akkor az időszak utolsó napja
  invoiceAccountingDeliveryDate?: Date; // Számviteli teljesítés dátuma. Időszak esetén az időszak utolsó napja
  periodicalSettlement?: boolean; // Időszakos elszámolás jelzése
  smallBusinessIndicator?: boolean; // Kisadózó jelzése
  currencyCode: string; // A számla pénzneme az ISO 4217 szabvány szerint
  exchangeRate: number; // HUF-tól különböző pénznem esetén az alkalmazott árfolyam: egy egység értéke HUF-ban
  utilitySettlementIndicator?: boolean; // Közmű elszámolószámla jelölése
  selfBillingIndicator?: boolean; // Önszámlázás jelölése (önszámlázás esetén true)
  paymentMethod?: PaymentMethodType; // Fizetés módja
  paymentDate?: Date; // Fizetési határidő
  cashAccountingIndicator?: boolean; // Pénzforgalmi elszámolás jelölése, ha az szerepel a számlán
  invoiceAppearance: InvoiceAppearanceType; // A számla vagy módosító okirat megjelenési formája
  conventionalInvoiceInfo?: ConventionalInvoiceInfoResponseType; // A számlafeldolgozást segítő, egyezményesen nevesített egyéb adatok
  additionalInvoiceData?: AdditionalDataResponseType[]; // A számlára vonatkozó egyéb adat;
};

export type InvoiceHeadResponseType = {
  supplierInfo: SupplierInfoResponseType; // Számlakibocsátó (eladó) adatai
  customerInfo?: CustomerInfoResponseType; //  Vevő adatai
  fiscalRepresentativeInfo?: FiscalRepresentativeInfoResponseType; //  Pénzügyi képviselő adatai
  invoiceDetail: InvoiceDetailResponseType; // Számla részletező adatok
};

export type LineOperationType = 'CREATE' | 'MODIFY';

export type LineModificationReferenceResponseType = {
  lineNumberReference: number; // Az eredeti számla módosítással érintett tételének sorszáma, (lineNumber). Új tétel létrehozása esetén az új tétel sorszáma, az eredeti számla folytatásaként
  lineOperation: LineOperationType; //  A számlatétel módosításának jellege;
};

export type AdvancePaymentDataResponseType = {
  advanceOriginalInvoice: string; // Az előlegszámla sorszáma, amelyben az előlegfizetés történt
  advancePaymentDate: string; // Az előleg fizetésének dátuma
  advanceExchangeRate: string; // Az előlegfizetéskor alkalmazott árfolyam;
};

export type AdvanceDataResponseType = {
  advanceIndicator: boolean; // Annak jelölése, hogy a tétel előleg jellegű
  advancePaymentData?: AdvancePaymentDataResponseType;
};

export type LineNatureIndicatorType = 'PRODUCT' | 'SERVICE' | 'OTHER';

export type LineDiscountDataResponseType = {
  discountDescription?: string; // Az árengedmény leírása
  discountValue?: number; // Tételhez tartozó árengedmény összege a számla pénznemében, ha az egységár nem tartalmazza
  discountRate?: number; // Tételhez tartozó árengedmény aránya százalékban, ha az egységár nem tartalmazza
};

export type VatExemptionResponseType = {
  case: ['AAM' | 'TAM' | 'KBAET' | 'KBAUK' | 'EAM' | 'NAM' | 'UNKNOWN']; // Az adómentesség jelölés kódja
  reason: string; // Az adómentesség jelölés leírása
};

export type VatOutOfScopeResponseType = {
  case: ['ATK' | 'EUFAD37' | 'EUFADE' | 'EUE' | 'HO' | 'UNKNOWN']; // Az Áfa tv.y hatályán kívüliség kódja;
  reason: string; // Az Áfa tv.hatályán kívüliség leírása;
};

export type MarginSchemeType = 'TRAVEL_AGENCY' | 'SECOND_HAND' | 'ARTWORK' | 'ANTIQUES';

export type VatAmountMismatchResponseType = {
  vatRate: string; // Adómérték, adótartalom
  case: string; // Adóalap és felszámított adó eltérésének kódja
};

export type VatRateResponseType = {
  vatPercentage?: number; // Az alkalmazott adó mértéke
  vatContent?: number; // Áfatartalom egyszerűsített számla esetén
  vatExemption?: VatExemptionResponseType;
  vatOutOfScope?: VatOutOfScopeResponseType;
  vatDomesticReverseCharge?: boolean; // A belföldi fordított adózás jelölése;
  marginSchemeIndicator?: MarginSchemeType; // Különbözet szerinti szabályozás jelölése
  vatAmountMismatch?: VatAmountMismatchResponseType;
  noVatCharge?: boolean; // Nincs felszámított áfa a 17. § alapján;
};

export type LineamountsNormalResponseType = {
  lineNetAmountData: {
    lineNetAmount: number; // Tétel nettó összege a számla pénznemében, különbözeti adózás esetén az ellenérték
    lineNetAmountHUF: number; // Tétel nettó összege forintban
  };

  lineVatRate: VatRateResponseType; // Adómérték vagy adómentesség jelölése;
  lineVatData?: {
    lineVatAmount: number; // Tétel áfa összege a számla pénznemében;
    lineVatAmountHUF: number; // Tétel áfa összege forintban
  };

  lineGrossAmountData?: {
    lineGrossAmountNormal: number; // Tétel bruttó értéke a számla pénznemében;
    lineGrossAmountNormalHUF: number; // Tétel bruttó értéke forintban
  };
};

export type NewTransportMeanResponseType = {
  brand?: string; // Gyártmány/típus
  serialNum?: string; // Alvázszám/gyári szám/Gyártási szám;
  engineNum?: string; // Motorszám
  firstEntryIntoService?: Date; // Első forgalomba helyezés időpontja
  vehicle?: {
    engineCapacity: number; // Hengerűrtartalom köbcentiméterben
    enginePower: number; // Teljesítmény kW-ban
    kms: number; // Futott kilométerek száma
  };

  vessel?: {
    length: number; // Hajó hossza méterben
    activityReferred: boolean; // Értéke true, ha a jármű az Áfa tv. 259.§ 25 .pont b) alpontja szerinti kivétel alá tartozik
    sailedHours: number; // Hajózott órák száma
  };

  aircraft?: {
    takeOffWeight: number; //  Felszállási tömeg kilogrammban
    airCargo: boolean; // Értéke true ha a jármű az Áfa tv. 259. § 25. pont c) alpontja szerinti kivétel alá tartozik
    operationHours: number; // Repült órák száma
  };
};

export type TakeOverReasonType =
  | '01'
  | '02_aa'
  | '02_ab'
  | '02_b'
  | '02_c'
  | '02_d'
  | '02_ea'
  | '02_eb'
  | '02_fa'
  | '02_fb'
  | '02_ga'
  | '02_gb';

export type ProductStreamType =
  | 'BATTERY'
  | 'PACKAGING'
  | 'OTHER_PETROL'
  | 'ELECTRONIC'
  | 'TIRE'
  | 'COMMERCIAL'
  | 'PLASTIC'
  | 'OTHER_CHEMICAL'
  | 'PAPER';

export type ProductFeeClauseResponseType = {
  productFeeTakeoverData?: // A környezetvédelmi termékdíjkötelezettség átvállalásával kapcsolatos adatok
  {
    takeoverReason: TakeOverReasonType; // Az átvállalás iránya és jogszabályi alapja
    takeoverAmount?: number; // Az átvállalt termékdíj összege forintban, ha a vevő vállalja át az eladó termékdíjkötelezettségét
  };

  customerDeclaration?: // Ha az eladó a vevő nyilatkozata alapján mentesül a termékdíj megfizetése alól, akkor az érintett termékáram
  {
    productStream: ProductStreamType; // Termékáram
    productWeight?: number; // Termékdíj köteles termék tömege kilogrammban
  };
};

export type DieselOilPurchaseResponseType = {
  purchaseLocation: SimpleAddressResponseType; // Gázolaj beszerzés helye
  purchaseDate: Date; // Gázolaj beszerzés dátuma
  vehicleRegistrationNumber: string; // Kereskedelmi jármű forgalmi rendszáma (csak betűk és számok
  dieselOilQuantity?: number; // Gépi bérmunka-szolgáltatás közben felhasznált gázolaj mennyisége literben
};

export type AggregateInvoiceLineDataResponseType = {
  lineExchangeRate?: number; // A tételhez tartozó árfolyam, 1 (egy) egységre vonatkoztatva. Csak külföldi pénznemben kiállított gyűjtőszámla esetén kitöltendő
  lineDeliveryDate: Date; // Gyűjtőszámla esetén az adott tétel teljesítési dátuma
};

export type LineAmountsSimplifiedResponseType = {
  lineVatRate: VatRateResponseType; // Áfatartalom vagy az áfával kapcsolatos egyéb eset jelölése
  lineGrossAmountSimplified: number; // Tétel bruttó értéke a számla pénznemében;
  lineGrossAmountSimplifiedHUF: number; // Tétel bruttó értéke forintban
};

export type ProductCodeResponseType = {
  productCodeCategory: // A termékkód értéke nem saját termékkód esetén
  'VTSZ' | 'SZJ' | 'KN' | 'AHK' | 'CSK' | 'KT' | 'EJ' | 'TESZOR' | 'OWN' | 'OTHER';

  productCodeValue?: string; //  A termékkód értéke
  productCodeOwnValue?: string; // Saját termékkód értéke
};

export type UnitOfMeasureType =
  | 'PIECE'
  | 'KILOGRAM'
  | 'TON'
  | 'KWH'
  | 'DAY'
  | 'HOUR'
  | 'MINUTE'
  | 'MONTH'
  | 'LITER'
  | 'KILOMETER'
  | 'CUBIC_METER'
  | 'METER'
  | 'LINEAR_METER'
  | 'CARTON'
  | 'PACK'
  | 'OWN ';

export type ProductFeeMeasuringUnitType = 'DARAB' | 'KG';

export type ProductFeeDataResponseType = {
  productFeeCode: ProductCodeResponseType; // Termékdíj kód (Kt vagy Csk)
  productFeeQuantity: number; // A termékdíjjal érintett termék mennyisége;
  productFeeMeasuringUnit: ProductFeeMeasuringUnitType; //A díjtétel egysége (kg vagy darab)
  productFeeRate: number; // A termékdíj díjtétele (HUF/egység)
  productFeeAmount: number; // Termékdíj összege forintban
};

export type LineResponseType = {
  lineNumber: number; // A tétel sorszáma
  lineModificationReference?: LineModificationReferenceResponseType; // Módosító számla esetén a tételsorszintű módosítások jelölése
  referencesToOtherLines?: // Hivatkozások kapcsolódó tételekre, ha ez az Áfa törvény alapján szükséges
  {
    referenceToOtherLine: number[]; //Hivatkozások kapcsolódó tételekre, ha ez az Áfa törvény alapján szükséges
  };

  advanceData?: AdvanceDataResponseType; // Előleghez kapcsolódó adatok
  productCodes?: // Termékkódok
  {
    productCode: ProductCodeResponseType[]; // Termékkód
  };

  lineExpressionIndicator: boolean; // Értéke true, ha a tétel mennyiségi egysége természetes mértékegységben kifejezhető
  lineNatureIndicator?: LineNatureIndicatorType; // Termékértékesítés vagy szolgáltatásnyújtás jelölése
  lineDescription?: string; // A termék vagy szolgáltatás megnevezése;
  quantity?: number; // Mennyiség
  unitOfMeasure?: UnitOfMeasureType; // Mennyiség egység
  unitOfMeasureOwn?: string; // Saját mennyiségi egység
  unitPrice?: number; // Egységár a számla pénznemében. Egyszerűsített számla esetén bruttó, egyéb esetben nettó egységár
  unitPriceHUF?: number; // Egységár forintban. Egyszerűsített számla esetén bruttó, egyéb esetben nettó egységár.
  lineDiscountData?: LineDiscountDataResponseType; // A tételhez tartozó árengedmény adatok;
  lineAmountsNormal?: LineamountsNormalResponseType; // Normál (nem egyszerűsített) számla esetén (beleértve a gyűjtőszámlát) kitöltendő tétel érték adatok.
  lineAmountsSimplified?: LineAmountsSimplifiedResponseType; // Egyszerűsített számla esetén kitöltendő tétel érték adatok
  intermediatedService?: boolean; // Értéke true ha a tétel közvetített szolgáltatás
  aggregateInvoiceLineData?: AggregateInvoiceLineDataResponseType; // Gyűjtőszámla adatok
  newTransportMean?: NewTransportMeanResponseType; // Új közlekedési eszköz értékesítés;
  depositIndicator?: boolean; // Értéke true, ha a tétel betétdíj jellegű;
  obligatedForProductFee?: boolean; // Értéke true ha a tételt termékdíj fizetési kötelezettség terheli
  GPCExcise?: number; // Földgáz, villamos energia, szén jövedéki adója forintban
  dieselOilPurchase?: DieselOilPurchaseResponseType; // Gázolaj adózottan történő beszerzésének adatai
  netaDeclaration?: boolean; //  Értéke true, ha a Neta tv-ben meghatározott adókötelezettség az adó alanyát terheli
  productFeeClause?: ProductFeeClauseResponseType; // A környezetvédelmi termékdíjról szóló 2011. évi LXXXV. tv. szerinti tételekre vonatkozó záradékok
  lineProductFeeContent?: ProductFeeDataResponseType; // A tétel termékdíj tartalmára vonatkozó adatok
  conventionalLineInfo?: ConventionalInvoiceInfoResponseType; // A számlafeldolgozást segítő, egyezményesen nevesített, egyéb adatok
  additionalLineData?: AdditionalDataResponseType; // A termék/szolgáltatás tételhez kapcsolódó, további adat
};

export type LinesResponseType = {
  mergedItemIndicator: boolean; // Jelöli, ha az adatszolgáltatás méretcsökkentés miatt összevont soradatokat tartalmaz
  line?: LineResponseType[]; // Termék/szolgáltatás tétel
};

export type SummaryByVatRateResponseType = {
  vatRate: VatRateResponseType; // Adómérték vagy adómentesség jelölése;
  vatRateNetData: {
    vatRateNetAmount: number; // Az adott adómértékhez tartozó értékesítés vagy szolgáltatásnyújtás nettó összege a számla pénznemében
    vatRateNetAmountHUF: number; // Az adott adómértékhez tartozó értékesítés vagy szolgáltatásnyújtás nettó összege forintban
  };

  vatRateVatData: {
    vatRateVatAmount: number; // Az adott adómértékhez tartozó értékesítés vagy szolgáltatásnyújtás áfa összege a számla pénznemében
    vatRateVatAmountHUF: number; // Az adott adómértékhez tartozó értékesítés vagy szolgáltatásnyújtás áfa összege forintban
  };

  vatRateGrossData?: {
    vatRateGrossAmount: number; // Az adott adómértékhez tartozó értékesítés vagy szolgáltatásnyújtás bruttó összege a számla pénznemében
    vatRateGrossAmountHUF: number; // Az adott adómértékhez tartozó értékesítés vagy szolgáltatásnyújtás bruttó összege forintban
  };
};

export type SummaryNormalResponseType = {
  summaryByVatRate: SummaryByVatRateResponseType[]; // Összesítés áfa-mérték szerint
  invoiceNetAmount: number; // A számla nettó összege a számla pénznemében;
  invoiceNetAmountHUF: number; // A számla nettó összege forintban;
  invoiceVatAmount: number; // A számla áfa összege a számla pénznemében;
  invoiceVatAmountHUF: number; // A számla áfa összege forintban
};

export type SummaryGrossDataResponseType = {
  invoiceGrossAmount: number; // A számla bruttó összege a számla pénznemében
  invoiceGrossAmountHUF: number; // A számla bruttó összege forintban;
};

export type SummarySimplifiedResponseType = {
  vatRate: VatRateResponseType; // Egyszerűsített számla esetén az adótartalom vagy adómentesség jelölése
  vatContentGrossAmount: number; // Az adott adótartalomhoz tartozó értékesítés vagy szolgáltatásnyújtás bruttó összege a számla pénznemében
  vatContentGrossAmountHUF: number; // Az adott adótartalomhoz tartozó értékesítés vagy szolgáltatásnyújtás bruttó összege forintban
};

export type InvoiceSummaryResponseType = {
  summaryNormal?: SummaryNormalResponseType;
  summarySimplified?: SummarySimplifiedResponseType[];
  summaryGrossData?: SummaryGrossDataResponseType;
};

export type ProductFeeOperationType = 'REFUND' | 'DEPOSIT';

export type ProductFeeSummaryResponseType = {
  productFeeOperation: ProductFeeOperationType; // Annak jelzése, hogy a termékdíj összesítés visszaigénylésre (REFUND) vagy raktárba történő beszállításra (DEPOSIT) vonatkozik
  productFeeData: ProductFeeDataResponseType[]; // Termékdíjadatok
  ProductChargeSum: number; // Termékdíj összesen
  PaymentEvidenceDocumentData?: // A termékdíj bevallását igazoló dokumentum adatai a 2011. évi
  {
    evidenceDocumentNo: string; // Számla sorszáma vagy egyéb okirat azonosító száma
    evidenceDocumentDate: Date; // Számla kelte
    obligatedName: string; // Kötelezett neve
    obligatedAddress: AddressResponseType; // Kötelezett címe
    obligatedTaxNumber: TaxNumberResponseType; // A kötelezett adószáma
  };
};

export type InvoiceResponseType = {
  invoiceReference?: invoiceReferenceResponseType;
  invoiceHead: InvoiceHeadResponseType;
  invoiceLines?: LinesResponseType;
  productFeeSummary?: ProductFeeSummaryResponseType[];
  invoiceSummary: InvoiceSummaryResponseType;
};

export type BatchInvoiceResponseType = {
  batchIndex: number;
  invoice: InvoiceResponseType;
};

export type InvoiceMainResponseType = {
  invoice?: InvoiceResponseType;
  batchInvoice?: BatchInvoiceResponseType[];
};

export type InvoiceDataResponse = {
  invoiceNumber: string; // Számla vagy módosító okirat sorszáma;
  invoiceIssueDate: Date; // Számla vagy módosító okirat kelte
  completenessIndicator: boolean; // Jelöli, ha az adatszolgáltatás maga a számla
  invoiceMain: InvoiceMainResponseType;
};

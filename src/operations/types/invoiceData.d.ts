export type TaxNumberType = {
  taxpayerId: string; // Az adóalany adó törzsszáma. Csoportos adóalany esetén csoportazonosító szám
  vatCode?: string; // Áfakód az adóalanyiság típusanak jelzésére. Egy számjegy
  countyCode?: string; // Megyekód, két számjegy
};

export type SimpleAddressType = {
  countryCode: string; // Az országkód az ISO 3166 alpha-2 szabvány szerint
  region?: string; // Tartomány kódja (ha értelmezhető az adott országban) az ISO 3166-2 alpha 2 szabvány szerint
  postalCode: string; // Irányítószám (ha nem értelmezhető, 0000 értékkel kell kitölteni)
  city: string; // Település
  additionalAddressDetail: string; // További címadatok (például közterület neve és jellege, házszám, emelet, ajtó, helyrajzi szám, stb.)
};

export type DetailedAddressType = {
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

export type AddressType = {
  simpleAddress?: SimpleAddressType;
  detailedAddress?: DetailedAddressType;
};

export type CustomerVatDataType = {
  customerTaxNumber: {
    taxpayerId: string; // Az adóalany adószámának törzsszáma. Csoportos adóalany esetén csoportazonosító szám
    vatCode?: string; // Áfakód az adóalanyiság típusanak jelzésére. Egy számjegy
    countyCode?: string; // Megyekód, két számjegy
    groupMemberTaxNumber?: TaxNumberType;
  };
};

export type ConventionalInvoiceInfoType = {
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

export type AdditionalDataType = {
  dataName: string; // Az adatmező egyedi azonosítója
  dataDescription: string; // Az adatmező tartalmának szöveges leírása
  dataValue: string; // Az adat értéke
};

export type invoiceReferenceType = {
  originalInvoiceNumber: string; // Az eredeti számla sorszáma, melyre a módosítás vonatkozik
  modifyWithoutMaster: boolean; // Annak jelzése, hogy a módosítás olyan alapszámlára hivatkozik, amelyről nem történt és nem is fog történni adatszolgáltatás
  modificationIndex: number; // A számlára vonatkozó módosító okirat egyedi sorszáma
};

export type SupplierInfoType = {
  supplierTaxNumber: TaxNumberType; // Belföldi adószám, amely alatt a számlán szereplő termékértékesítés vagy szolgáltatásnyújtás történt. Lehet csoportazonosító szám is.
  groupMemberTaxNumber?: TaxNumberType; // Csoporttag adószáma, ha a termékértékesítés vagy szolgáltatásnyújtás csoportazonosító szám alatt történt
  communityVatNumber?: string; // Közösségi adószám
  supplierName: string; // Az eladó (szállító) neve
  supplierAddress: AddressType; // Az eladó (szállító) címe
  supplierBankAccountNumber?: string; // Az eladó (szállító) bankszámlaszáma;
  individualExemption?: boolean; // Értéke true, ha a számlakibocsátó (eladó) alanyi áfamentes
  exciseLicenceNum?: string; // Az eladó adóraktári engedélyének vagy jövedéki engedélyének száma
};

export type CustomerVatStatusType = 'DOMESTIC' | 'OTHER' | 'PRIVATE_PERSON';

export type CustomerInfoType = {
  customerVatStatus: CustomerVatStatusType; // Vevő áfa szerinti státusza
  customerVatData?: CustomerVatDataType; // A vevő áfaalanyisági adatai
  customerName?: string; // A vevő neve
  customerAddress?: AddressType; // A vevő címe
  customerBankAccountNumber?: string; // Vevő bankszámlaszáma
};

export type FiscalRepresentativeInfoType = {
  fiscalRepresentativeTaxNumber: TaxNumberType; // A pénzügyi képviselő adószáma
  fiscalRepresentativeName: string; // A pénzügyi képviselő neve
  fiscalRepresentativeAddress: AddressType; // Pénzügyi képviselő címe
  fiscalRepresentativeBankAccountNumber?: string; // Pénzügyi képviselő által a számlakibocsátó (eladó) számára megnyitott bankszámla bankszámlaszáma
};

export type InvoiceCategoryType = 'NORMAL' | 'SIMPLIFIED' | 'AGGREGATE';

export type PaymentMethodType =
  | 'TRANSFER'
  | 'CASH'
  | 'CARD'
  | 'VOUCHER'
  | 'OTHER';

export type InvoiceAppearanceType = 'PAPER' | 'ELECTRONIC' | 'EDI' | 'UNKNOWN';

export type InvoiceDetailType = {
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
  conventionalInvoiceInfo?: ConventionalInvoiceInfoType; // A számlafeldolgozást segítő, egyezményesen nevesített egyéb adatok
  additionalInvoiceData?: AdditionalDataType[]; // A számlára vonatkozó egyéb adat;
};

export type InvoiceHeadType = {
  supplierInfo: SupplierInfoType; // Számlakibocsátó (eladó) adatai
  customerInfo?: CustomerInfoType; //  Vevő adatai
  fiscalRepresentativeInfo?: FiscalRepresentativeInfoType; //  Pénzügyi képviselő adatai
  invoiceDetail: InvoiceDetailType; // Számla részletező adatok
};

export type LineOperationType = 'CREATE' | 'MODIFY';

export type LineModificationReferenceType = {
  lineNumberReference: number; // Az eredeti számla módosítással érintett tételének sorszáma, (lineNumber). Új tétel létrehozása esetén az új tétel sorszáma, az eredeti számla folytatásaként
  lineOperation: LineOperationType; //  A számlatétel módosításának jellege;
};

export type AdvancePaymentDataType = {
  advanceOriginalInvoice: string; // Az előlegszámla sorszáma, amelyben az előlegfizetés történt
  advancePaymentDate: string; // Az előleg fizetésének dátuma
  advanceExchangeRate: string; // Az előlegfizetéskor alkalmazott árfolyam;
};

export type AdvanceDataType = {
  advanceIndicator: boolean; // Annak jelölése, hogy a tétel előleg jellegű
  advancePaymentData?: AdvancePaymentDataType;
};

export type LineNatureIndicatorType = 'PRODUCT' | 'SERVICE' | 'OTHER';

export type LineDiscountDataType = {
  discountDescription?: string; // Az árengedmény leírása
  discountValue?: number; // Tételhez tartozó árengedmény összege a számla pénznemében, ha az egységár nem tartalmazza
  discountRate?: number; // Tételhez tartozó árengedmény aránya százalékban, ha az egységár nem tartalmazza
};

export type VatExemptionType = {
  case: 'AAM' | 'TAM' | 'KBAET' | 'KBAUK' | 'EAM' | 'NAM' | 'UNKNOWN'; // Az adómentesség jelölés kódja
  reason: string; // Az adómentesség jelölés leírása
};

export type VatOutOfScopeType = {
  case: 'ATK' | 'EUFAD37' | 'EUFADE' | 'EUE' | 'HO' | 'UNKNOWN'; // Az Áfa tv.y hatályán kívüliség kódja;
  reason: string; // Az Áfa tv.hatályán kívüliség leírása;
};

export type MarginSchemeType =
  | 'TRAVEL_AGENCY'
  | 'SECOND_HAND'
  | 'ARTWORK'
  | 'ANTIQUES';

export type VatAmountMismatchType = {
  vatRate: string; // Adómérték, adótartalom
  case: string; // Adóalap és felszámított adó eltérésének kódja
};

export type VatRateType = {
  vatPercentage?: number; // Az alkalmazott adó mértéke
  vatContent?: number; // Áfatartalom egyszerűsített számla esetén
  vatExemption?: VatExemptionType;
  vatOutOfScope?: VatOutOfScopeType;
  vatDomesticReverseCharge?: boolean; // A belföldi fordított adózás jelölése;
  marginSchemeIndicator?: MarginSchemeType; // Különbözet szerinti szabályozás jelölése
  vatAmountMismatch?: VatAmountMismatchType;
  noVatCharge?: boolean; // Nincs felszámított áfa a 17. § alapján;
};

export type LineamountsNormalType = {
  lineNetAmountData: {
    lineNetAmount: number; // Tétel nettó összege a számla pénznemében, különbözeti adózás esetén az ellenérték
    lineNetAmountHUF: number; // Tétel nettó összege forintban
  };

  lineVatRate: VatRateType; // Adómérték vagy adómentesség jelölése;
  lineVatData?: {
    lineVatAmount: number; // Tétel áfa összege a számla pénznemében;
    lineVatAmountHUF: number; // Tétel áfa összege forintban
  };

  lineGrossAmountData?: {
    lineGrossAmountNormal: number; // Tétel bruttó értéke a számla pénznemében;
    lineGrossAmountNormalHUF: number; // Tétel bruttó értéke forintban
  };
};

export type NewTransportMeanType = {
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

export type ProductFeeClauseType = {
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

export type DieselOilPurchaseType = {
  purchaseLocation: SimpleAddressType; // Gázolaj beszerzés helye
  purchaseDate: Date; // Gázolaj beszerzés dátuma
  vehicleRegistrationNumber: string; // Kereskedelmi jármű forgalmi rendszáma (csak betűk és számok
  dieselOilQuantity?: number; // Gépi bérmunka-szolgáltatás közben felhasznált gázolaj mennyisége literben
};

export type AggregateInvoiceLineData = {
  lineExchangeRate?: number; // A tételhez tartozó árfolyam, 1 (egy) egységre vonatkoztatva. Csak külföldi pénznemben kiállított gyűjtőszámla esetén kitöltendő
  lineDeliveryDate: Date; // Gyűjtőszámla esetén az adott tétel teljesítési dátuma
};

export type LineAmountsSimplified = {
  lineVatRate: VatRateType; // Áfatartalom vagy az áfával kapcsolatos egyéb eset jelölése
  lineGrossAmountSimplified: number; // Tétel bruttó értéke a számla pénznemében;
  lineGrossAmountSimplifiedHUF: number; // Tétel bruttó értéke forintban
};

export type ProductCodeType = {
  productCodeCategory: // A termékkód értéke nem saját termékkód esetén
  | 'VTSZ'
    | 'SZJ'
    | 'KN'
    | 'AHK'
    | 'CSK'
    | 'KT'
    | 'EJ'
    | 'TESZOR'
    | 'OWN'
    | 'OTHER';

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

export type ProductFeeDataType = {
  productFeeCode: ProductCodeType; // Termékdíj kód (Kt vagy Csk)
  productFeeQuantity: number; // A termékdíjjal érintett termék mennyisége;
  productFeeMeasuringUnit: ProductFeeMeasuringUnitType; //A díjtétel egysége (kg vagy darab)
  productFeeRate: number; // A termékdíj díjtétele (HUF/egység)
  productFeeAmount: number; // Termékdíj összege forintban
};

export type LineType = {
  lineNumber: number; // A tétel sorszáma
  lineModificationReference?: LineModificationReferenceType; // Módosító számla esetén a tételsorszintű módosítások jelölése
  referencesToOtherLines?: // Hivatkozások kapcsolódó tételekre, ha ez az Áfa törvény alapján szükséges
  {
    referenceToOtherLine: number[]; //Hivatkozások kapcsolódó tételekre, ha ez az Áfa törvény alapján szükséges
  };

  advanceData?: AdvanceDataType; // Előleghez kapcsolódó adatok
  productCodes?: // Termékkódok
  {
    productCode: ProductCodeType[]; // Termékkód
  };

  lineExpressionIndicator: boolean; // Értéke true, ha a tétel mennyiségi egysége természetes mértékegységben kifejezhető
  lineNatureIndicator?: LineNatureIndicatorType; // Termékértékesítés vagy szolgáltatásnyújtás jelölése
  lineDescription?: string; // A termék vagy szolgáltatás megnevezése;
  quantity?: number; // Mennyiség
  unitOfMeasure?: UnitOfMeasureType; // Mennyiség egység
  unitOfMeasureOwn?: string; // Saját mennyiségi egység
  unitPrice?: number; // Egységár a számla pénznemében. Egyszerűsített számla esetén bruttó, egyéb esetben nettó egységár
  unitPriceHUF?: number; // Egységár forintban. Egyszerűsített számla esetén bruttó, egyéb esetben nettó egységár.
  lineDiscountData?: LineDiscountDataType; // A tételhez tartozó árengedmény adatok;
  lineAmountsNormal?: LineamountsNormalType; // Normál (nem egyszerűsített) számla esetén (beleértve a gyűjtőszámlát) kitöltendő tétel érték adatok.
  lineAmountsSimplified?: LineAmountsSimplified; // Egyszerűsített számla esetén kitöltendő tétel érték adatok
  intermediatedService?: boolean; // Értéke true ha a tétel közvetített szolgáltatás
  aggregateInvoiceLineData?: AggregateInvoiceLineData; // Gyűjtőszámla adatok
  newTransportMean?: NewTransportMeanType; // Új közlekedési eszköz értékesítés;
  depositIndicator?: boolean; // Értéke true, ha a tétel betétdíj jellegű;
  obligatedForProductFee?: boolean; // Értéke true ha a tételt termékdíj fizetési kötelezettség terheli
  GPCExcise?: number; // Földgáz, villamos energia, szén jövedéki adója forintban
  dieselOilPurchase?: DieselOilPurchaseType; // Gázolaj adózottan történő beszerzésének adatai
  netaDeclaration?: boolean; //  Értéke true, ha a Neta tv-ben meghatározott adókötelezettség az adó alanyát terheli
  productFeeClause?: ProductFeeClauseType; // A környezetvédelmi termékdíjról szóló 2011. évi LXXXV. tv. szerinti tételekre vonatkozó záradékok
  lineProductFeeContent?: ProductFeeDataType; // A tétel termékdíj tartalmára vonatkozó adatok
  conventionalLineInfo?: ConventionalInvoiceInfoType; // A számlafeldolgozást segítő, egyezményesen nevesített, egyéb adatok
  additionalLineData?: AdditionalDataType; // A termék/szolgáltatás tételhez kapcsolódó, további adat
};

export type LinesType = {
  mergedItemIndicator: boolean; // Jelöli, ha az adatszolgáltatás méretcsökkentés miatt összevont soradatokat tartalmaz
  line?: LineType[]; // Termék/szolgáltatás tétel
};

export type SummaryByVatRateType = {
  vatRate: VatRateType; // Adómérték vagy adómentesség jelölése;
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

export type SummaryNormalType = {
  summaryByVatRate: SummaryByVatRateType[]; // Összesítés áfa-mérték szerint
  invoiceNetAmount: number; // A számla nettó összege a számla pénznemében;
  invoiceNetAmountHUF: number; // A számla nettó összege forintban;
  invoiceVatAmount: number; // A számla áfa összege a számla pénznemében;
  invoiceVatAmountHUF: number; // A számla áfa összege forintban
};

export type SummaryGrossDataType = {
  invoiceGrossAmount: number; // A számla bruttó összege a számla pénznemében
  invoiceGrossAmountHUF: number; // A számla bruttó összege forintban;
};

export type SummarySimplifiedType = {
  vatRate: VatRateType; // Egyszerűsített számla esetén az adótartalom vagy adómentesség jelölése
  vatContentGrossAmount: number; // Az adott adótartalomhoz tartozó értékesítés vagy szolgáltatásnyújtás bruttó összege a számla pénznemében
  vatContentGrossAmountHUF: number; // Az adott adótartalomhoz tartozó értékesítés vagy szolgáltatásnyújtás bruttó összege forintban
};

export type InvoiceSummaryType = {
  summaryNormal?: SummaryNormalType;
  summarySimplified?: SummarySimplifiedType[];
  summaryGrossData?: SummaryGrossDataType;
};

export type ProductFeeOperationType = 'REFUND' | 'DEPOSIT';

export type ProductFeeSummaryType = {
  productFeeOperation: ProductFeeOperationType; // Annak jelzése, hogy a termékdíj összesítés visszaigénylésre (REFUND) vagy raktárba történő beszállításra (DEPOSIT) vonatkozik
  productFeeData: ProductFeeDataType[]; // Termékdíjadatok
  ProductChargeSum: number; // Termékdíj összesen
  PaymentEvidenceDocumentData?: // A termékdíj bevallását igazoló dokumentum adatai a 2011. évi
  {
    evidenceDocumentNo: string; // Számla sorszáma vagy egyéb okirat azonosító száma
    evidenceDocumentDate: Date; // Számla kelte
    obligatedName: string; // Kötelezett neve
    obligatedAddress: AddressType; // Kötelezett címe
    obligatedTaxNumber: TaxNumberType; // A kötelezett adószáma
  };
};

export type InvoiceType = {
  invoiceReference?: invoiceReferenceType;
  invoiceHead: InvoiceHeadType;
  invoiceLines?: LinesType;
  productFeeSummary?: ProductFeeSummaryType[];
  invoiceSummary: InvoiceSummaryType;
};

export type BatchInvoiceType = {
  batchIndex: number;
  invoice: InvoiceType;
};

export type InvoiceMainType = {
  invoice?: InvoiceType;
  batchInvoice?: BatchInvoiceType[];
};

export type InvoiceData = {
  invoiceNumber: string; // Számla vagy módosító okirat sorszáma;
  invoiceIssueDate: Date; // Számla vagy módosító okirat kelte
  completenessIndicator: boolean; // Jelöli, ha az adatszolgáltatás maga a számla
  invoiceMain: InvoiceMainType;
};

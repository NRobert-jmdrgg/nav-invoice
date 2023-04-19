import { InvoiceData, InvoiceMainType, InvoiceType } from '../types/invoiceData';
import { OrderSchema, reOrder } from './reOrder';

export default function createInvoice(
  invoiceNumber: string,
  invoiceIssueDate: string,
  completenessIndicator: boolean,
  invoices: InvoiceType[]
): InvoiceData {
  invoices.forEach((invoice) => fixInvoice(invoice));

  let invoiceMain: InvoiceMainType;
  if (invoices.length > 1) {
    invoiceMain = {
      batchInvoice: invoices.map((invoice, index) => {
        return {
          batchIndex: index + 1,
          invoice: invoice,
        };
      }),
    };
  } else {
    invoiceMain = { invoice: invoices[0] };
  }

  return {
    InvoiceData: {
      $xmlns: 'http://schemas.nav.gov.hu/OSA/3.0/data',
      '$xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '$xsi:schemaLocation': 'http://schemas.nav.gov.hu/OSA/3.0/data invoiceData.xsd',
      '$xmlns:common': 'http://schemas.nav.gov.hu/NTCA/1.0/common',
      '$xmlns:base': 'http://schemas.nav.gov.hu/OSA/3.0/base',
      invoiceNumber,
      invoiceIssueDate,
      completenessIndicator,
      invoiceMain,
    },
  };
}

function fixInvoice(invoice: InvoiceType) {
  reOrder(invoice.invoiceReference, invoiceReferenceOrderSchema);
  reOrder(invoice.invoiceHead, invoiceHeadOrderSchema);
  reOrder(invoice.invoiceLines, invoiceLinesOrderSchema);
  invoice.productFeeSummary?.forEach((pfs) => reOrder(pfs, productFeeSUmmaryOrderSchema));
  reOrder(invoice.invoiceSummary, invoiceSummaryOrderSchema);
}

const taxNumberTypeOrder = ['taxpayerId', 'vatCode', 'countyCode'];
const simpleAddressTypeOrder = ['countryCode', 'region', 'postalCode', 'city', 'additionalAddressDetail'];
const detailedAddressTypeOrder = [
  'countryCode',
  'region',
  'postalCode',
  'city',
  'streetName',
  'publicPlaceCategory',
  'number',
  'building',
  'staircase',
  'floor',
  'door',
  'lotNumber',
];
const addressTypeOrder = ['simpleAddress', 'detailedAddress'];
const vatRateTypeOrder = [
  'vatPercentage',
  'vatContent',
  'vatExemption',
  'vatOutOfScope',
  'vatDomesticReverseCharge',
  'marginSchemeIndicator',
  'vatAmountMismatch',
  'noVatCharge',
];
const vatExemptionTypeOrder = ['case', 'reason'];
const vatOutOfScopeTypeOrder = ['case', 'reason'];
const vatAmountMismatchTypeOrder = ['vatRate', 'case'];

const invoiceHeadOrderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['supplierInfo', 'customerInfo', 'fiscalRepresentativeInfo', 'invoiceDetail'],
  },
  {
    path: 'supplierInfo',
    order: [
      'supplierTaxNumber',
      'groupMemberTaxNumber',
      'communityVatNumber',
      'supplierName',
      'supplierAddress',
      'supplierBankAccountNumber',
      'individualExemption',
      'exciseLicenceNum',
    ],
  },
  {
    path: 'supplierInfo.supplierTaxNumber',
    order: taxNumberTypeOrder,
  },
  {
    path: 'supplierInfo.groupMemberTaxNumber',
    order: taxNumberTypeOrder,
  },
  {
    path: 'supplierInfo.supplierAddress',
    order: addressTypeOrder,
  },
  {
    path: 'supplierInfo.supplierAddress.simpleAddress',
    order: simpleAddressTypeOrder,
  },
  {
    path: 'supplierInfo.supplierAddress.detailedAddress',
    order: detailedAddressTypeOrder,
  },
  {
    path: 'customerInfo',
    order: ['customerVatStatus', 'customerVatData', 'customerName', 'customerAddress', 'customerBankAccountNumber'],
  },
  {
    path: 'customerInfo.customerVatData.customerTaxNumber',
    order: ['taxpayerId', 'vatCode', 'countyCode', 'groupMemberTaxNumber'],
  },
  {
    path: 'customerInfo.customerVatData.customerTaxNumber.groupMemberTaxNumber',
    order: taxNumberTypeOrder,
  },
  {
    path: 'customerInfo.customerAddress',
    order: addressTypeOrder,
  },
  {
    path: 'customerInfo.customerAddress.simpleAddress',
    order: simpleAddressTypeOrder,
  },
  {
    path: 'customerInfo.customerAddress.detailedAddress',
    order: detailedAddressTypeOrder,
  },
  {
    path: 'fiscalRepresentativeInfo',
    order: [
      'fiscalRepresentativeTaxNumber',
      'fiscalRepresentativeName',
      'fiscalRepresentativeAddress',
      'fiscalRepresentativeBankAccountNumber',
    ],
  },
  {
    path: 'fiscalRepresentativeInfo.fiscalRepresentativeTaxNumber',
    order: taxNumberTypeOrder,
  },
  {
    path: 'fiscalRepresentativeInfo.fiscalRepresentativeAddress',
    order: addressTypeOrder,
  },
  {
    path: 'fiscalRepresentativeInfo.fiscalRepresentativeAddress.simpleAddress',
    order: simpleAddressTypeOrder,
  },
  {
    path: 'fiscalRepresentativeInfo.fiscalRepresentativeAddress.detailedAddress',
    order: detailedAddressTypeOrder,
  },
  {
    path: 'invoiceDetail',
    order: [
      'invoiceCategory',
      'invoiceDeliveryDate',
      'invoiceDeliveryPeriodStart',
      'invoiceDeliveryPeriodEnd',
      'invoiceAccountingDeliveryDate',
      'periodicalSettlement',
      'smallBusinessIndicator',
      'currencyCode',
      'exchangeRate',
      'utilitySettlementIndicator',
      'selfBillingIndicator',
      'paymentMethod',
      'paymentDate',
      'cashAccountingIndicator',
      'invoiceAppearance',
      'conventionalInvoiceInfo',
      'additionalInvoiceData',
    ],
  },
  {
    path: 'invoiceDetail.conventionalInvoiceInfo',
    order: [
      'orderNumbers',
      'deliveryNotes',
      'shippingDates',
      'contractNumbers',
      'supplierCompanyCodes',
      'customerCompanyCodes',
      'dealerCodes',
      'costCenters',
      'projectNumbers',
      'generalLedgerAccountNumbers',
      'glnNumbersSupplier',
      'glnNumbersCustomer',
      'materialNumbers',
      'itemNumbers',
      'ekaerIds',
    ],
  },
  {
    path: 'invoiceDetail.additionalInvoiceData',
    order: ['dataName', 'dataDescription', 'dataValue'],
  },
];

const invoiceSummaryOrderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['summaryNormal', 'summarySimplified', 'summaryGrossData'],
  },
  {
    path: 'summaryNormal',
    order: ['summaryByVatRate', 'invoiceNetAmount', 'invoiceNetAmountHUF', 'invoiceVatAmount', 'invoiceVatAmountHUF'],
  },
  {
    path: 'summaryNormal.summaryByVatRate',
    order: ['vatRate', 'vatRateNetData', 'vatRateVatData', 'vatRateGrossData'],
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRate',
    order: vatRateTypeOrder,
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRate.vatExemption',
    order: vatExemptionTypeOrder,
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRate.vatOutOfScope',
    order: vatOutOfScopeTypeOrder,
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRate.vatAmountMismatch',
    order: vatAmountMismatchTypeOrder,
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRateNetData',
    order: ['vatRateNetAmount', 'vatRateNetAmountHUF'],
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRateVatData',
    order: ['vatRateVatAmount', 'vatRateVatAmountHUF'],
  },
  {
    path: 'summaryNormal.summaryByVatRate.vatRateGrossData',
    order: ['vatRateGrossAmount', 'vatRateGrossAmountHUF'],
  },
  {
    path: 'summarySimplified',
    order: ['vatRate', 'vatContentGrossAmount', 'vatContentGrossAmountHUF'],
  },
  {
    path: 'summarySimplified.vatRate',
    order: vatRateTypeOrder,
  },
  {
    path: 'summarySimplified.vatRate.vatExemption',
    order: vatExemptionTypeOrder,
  },
  {
    path: 'summarySimplified.vatRate.vatOutOfScope',
    order: vatOutOfScopeTypeOrder,
  },
  {
    path: 'summarySimplified.vatRate.vatAmountMismatch',
    order: vatAmountMismatchTypeOrder,
  },
  {
    path: 'summaryGrossData',
    order: ['invoiceGrossAmount', 'invoiceGrossAmountHUF'],
  },
];

const invoiceReferenceOrderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['originalInvoiceNumber', 'modifyWithoutMaster', 'modificationIndex'],
  },
];

const invoiceLinesOrderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['mergedItemIndicator', 'line'],
  },
  {
    path: 'line',
    order: [
      'lineNumber',
      'lineModificationReference',
      'referencesToOtherLines',
      'advanceData',
      'productCodes',
      'lineExpressionIndicator',
      'lineNatureIndicator',
      'lineDescription',
      'quantity',
      'unitOfMeasure',
      'unitOfMeasureOwn',
      'unitPrice',
      'unitPriceHUF',
      'lineDiscountData',
      'lineAmountsNormal',
      'lineAmountsSimplified',
      'intermediatedService',
      'aggregateInvoiceLineData',
      'newTransportMean',
      'depositIndicator',
      'obligatedForProductFee',
      'GPCExcise',
      'dieselOilPurchase',
      'netaDeclaration',
      'productFeeClause',
      'lineProductFeeContent',
      'conventionalLineInfo',
      'additionalLineData',
    ],
  },
  {
    path: 'line.lineModificationReference',
    order: ['lineNumberReference', 'lineOperation'],
  },
  {
    path: 'line.advanceData',
    order: ['advanceIndicator', 'advancePaymentData'],
  },
  {
    path: 'line.advanceData.advancePaymentData',
    order: ['advanceOriginalInvoice', 'advancePaymentDate', 'advanceExchangeRate'],
  },
  {
    path: 'line.lineDiscountData',
    order: ['discountDescription', 'discountValue', 'discountRate'],
  },
  {
    path: 'line.lineAmountsNormal',
    order: ['lineNetAmountData', 'lineVatRate', 'lineVatData', 'lineGrossAmountData'],
  },
  {
    path: 'line.lineAmountsNormal.lineNetAmountData',
    order: ['lineNetAmount', 'lineNetAmountHUF'],
  },
  {
    path: 'line.lineAmountsNormal.lineVatRate',
    order: vatRateTypeOrder,
  },
  {
    path: 'line.lineAmountsNormal.lineVatRate.vatExemption',
    order: vatExemptionTypeOrder,
  },
  {
    path: 'line.lineAmountsNormal.lineVatRate.vatOutOfScope',
    order: vatOutOfScopeTypeOrder,
  },
  {
    path: 'line.lineAmountsNormal.lineVatRate.vatAmountMismatch',
    order: vatAmountMismatchTypeOrder,
  },
  {
    path: 'line.lineAmountsNormal.lineVatData',
    order: ['lineVatAmount', 'lineVatAmountHUF'],
  },
  {
    path: 'line.lineAmountsNormal.lineGrossAmountData',
    order: ['lineGrossAmountNormal', 'lineGrossAmountNormalHUF'],
  },
  {
    path: 'line.lineAmountsSimplified',
    order: ['lineVatRate', 'lineGrossAmountSimplified', 'lineGrossAmountSimplifiedHUF'],
  },
  {
    path: 'line.lineAmountsSimplified.lineVatRate',
    order: vatRateTypeOrder,
  },
  {
    path: 'line.lineAmountsSimplified.lineVatRate.vatExemption',
    order: vatExemptionTypeOrder,
  },
  {
    path: 'line.lineAmountsSimplified.lineVatRate.vatOutOfScope',
    order: vatOutOfScopeTypeOrder,
  },
  {
    path: 'line.lineAmountsSimplified.lineVatRate.vatAmountMismatch',
    order: vatAmountMismatchTypeOrder,
  },
  {
    path: 'line.aggregateInvoiceLineData',
    order: ['lineExchangeRate', 'lineDeliveryDate'],
  },
  {
    path: 'line.newTransportMean',
    order: ['brand', 'serialNum', 'engineNum', 'firstEntryIntoService', 'vehicle', 'vessel', 'aircraft'],
  },
  {
    path: 'line.newTransportMean.vehicle',
    order: ['engineCapacity', 'enginePower', 'kms'],
  },
  {
    path: 'line.newTransportMean.vessel',
    order: ['length', 'activityReferred', 'sailedHours'],
  },
  {
    path: 'line.newTransportMean.aircraft',
    order: ['takeOffWeight', 'airCargo', 'operationHours'],
  },
];

const productFeeSUmmaryOrderSchema: OrderSchema[] = [
  {
    path: '',
    order: ['productFeeOperation', 'productFeeData', 'ProductChargeSum', 'PaymentEvidenceDocumentData'],
  },
  {
    path: 'productFeeData',
    order: ['productFeeCode', 'productFeeQuantity', 'productFeeMeasuringUnit', 'productFeeRate', 'productFeeAmount'],
  },
  {
    path: 'productFeeData.productFeeCode',
    order: ['productCodeCategory', 'productCodeValue', 'productCodeOwnValue'],
  },
  {
    path: 'PaymentEvidenceDocumentData',
    order: ['evidenceDocumentNo', 'evidenceDocumentDate', 'obligatedName', 'obligatedAddress', 'obligatedTaxNumber'],
  },
  {
    path: 'PaymentEvidenceDocumentData.obligatedAddress',
    order: addressTypeOrder,
  },
  {
    path: 'PaymentEvidenceDocumentData.obligatedAddress.simpleAddress',
    order: simpleAddressTypeOrder,
  },
  {
    path: 'PaymentEvidenceDocumentData.obligatedAddress.detailedAddress',
    order: detailedAddressTypeOrder,
  },
  {
    path: 'PaymentEvidenceDocumentData.obligatedTaxNumber',
    order: taxNumberTypeOrder,
  },
];

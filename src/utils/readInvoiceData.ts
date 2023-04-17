import { InvoiceData } from '../operations/types/invoiceData';
import readFromXml from './readFromXml';
import { base64ToUtf8 } from './base64';
import { uncompressData } from './gzip';
// import { fixKnownArrays } from './fixKnownArrays';

/**
 * Invoice adatok kiolvasása base64 kódolású xml-ből
 * @param base64Xml base64 kódolású xml
 * @param compressed igaz, ha a kapott adat tömörített
 * @returns invoice adatok
 */
export default async function readInvoiceData(data: string, compressed = false): Promise<InvoiceData> {
  try {
    if (compressed) {
      data = uncompressData(Buffer.from(data, 'base64'));
    } else {
      data = base64ToUtf8(data);
    }

    const invoiceData = await readFromXml<InvoiceData>(data, knownArrays);

    return invoiceData;
  } catch (error) {
    throw error;
  }
}

const knownArrays = [
  'InvoiceData.invoiceMain.batchInvoice',
  'InvoiceData.invoiceMain.batchInvoice.invoice.productFeeSummary',
  'InvoiceData.invoiceMain.batchInvoice.invoice.productFeeSummary.productFeeData',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.additionalInvoiceData',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.orderNumbers.orderNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.deliveryNotes.deliveryNote',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.shippingDates.shippingDate',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.contractNumbers.contractNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.supplierCompanyCodes.supplierCompanyCode',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.customerCompanyCodes.customerCompanyCode',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.dealerCodes.dealerCode',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.costCenters.costCenter',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.projectNumbers.projectnumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.generalLedgerAccountNumbers.generalLedgerAccountNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.glnNumbersSupplier.glnNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.glnNumbersCustomem.glnNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.materialNumbers.materialNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.itemNumbers.itemNumber',
  'InvoiceData.invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.ekaerIds.ekaerId',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.referencesToOtherLines.referenceToOtherLine',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.productCodes.ProductCodeType',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.orderNumbers.orderNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.deliveryNotes.deliveryNote',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.shippingDates.shippingDate',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.contractNumbers.contractNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.supplierCompanyCodes.supplierCompanyCode',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.customerCompanyCodes.customerCompanyCode',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.dealerCodes.dealerCode',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.costCenters.costCenter',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.projectNumbers.projectnumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.generalLedgerAccountNumbers.generalLedgerAccountNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.glnNumbersSupplier.glnNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.glnNumbersCustomem.glnNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.materialNumbers.materialNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.itemNumbers.itemNumber',
  'InvoiceData.invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.ekaerIds.ekaerId',
  'InvoiceData.invoiceSummary.summaryNormal.summaryByVatRate',
  'InvoiceData.invoiceSummary.summarySimplified',
];

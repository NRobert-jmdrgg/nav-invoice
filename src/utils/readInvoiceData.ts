import { InvoiceData } from '../operations/types/invoiceData';
import { gunzip } from 'zlib';
import readFromXml from './readFromXml';
import { base64ToUtf8 } from './base64';
import { fixKnownArrays } from './fixKnownArrays';

/**
 * Invoice adatok kiolvasása base64 kódolású xml-ből
 * @param base64Xml base64 kódolású xml
 * @param compressed igaz, ha a kapott adat tömörített
 * @returns invoice adatok
 */
export default async function readInvoiceData(data: string, compressed = false): Promise<InvoiceData> {
  if (compressed) {
    data = await uncompressData(Buffer.from(data, 'base64'));
  } else {
    data = base64ToUtf8(data);
  }

  console.log(data);

  const invoiceData = await readFromXml<InvoiceData>(data);

  fixKnownArrays(invoiceData, knownArrays);

  return invoiceData;
}

async function uncompressData(compressedData: Buffer): Promise<string> {
  try {
    const uncompressedData = await new Promise<Buffer>((resolve, reject) => {
      gunzip(compressedData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return uncompressedData.toString();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const knownArrays = [
  'invoiceMain.batchInvoice',
  'invoiceMain.batchInvoice.invoice.productFeeSummary',
  'invoiceMain.batchInvoice.invoice.productFeeSummary.productFeeData',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.additionalInvoiceData',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.orderNumbers.orderNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.deliveryNotes.deliveryNote',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.shippingDates.shippingDate',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.contractNumbers.contractNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.supplierCompanyCodes.supplierCompanyCode',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.customerCompanyCodes.customerCompanyCode',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.dealerCodes.dealerCode',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.costCenters.costCenter',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.projectNumbers.projectnumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.generalLedgerAccountNumbers.generalLedgerAccountNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.glnNumbersSupplier.glnNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.glnNumbersCustomem.glnNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.materialNumbers.materialNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.itemNumbers.itemNumber',
  'invoiceMain.invoice.invoiceHead.invoiceDetail.conventionalInvoiceInfo.ekaerIds.ekaerId',
  'invoiceMain.invoice.invoiceLines.line',
  'invoiceMain.invoice.invoiceLines.line.referencesToOtherLines.referenceToOtherLine',
  'invoiceMain.invoice.invoiceLines.line.productCodes.ProductCodeType',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.orderNumbers.orderNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.deliveryNotes.deliveryNote',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.shippingDates.shippingDate',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.contractNumbers.contractNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.supplierCompanyCodes.supplierCompanyCode',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.customerCompanyCodes.customerCompanyCode',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.dealerCodes.dealerCode',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.costCenters.costCenter',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.projectNumbers.projectnumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.generalLedgerAccountNumbers.generalLedgerAccountNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.glnNumbersSupplier.glnNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.glnNumbersCustomem.glnNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.materialNumbers.materialNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.itemNumbers.itemNumber',
  'invoiceMain.invoice.invoiceLines.line.conventionalInvoiceInfo.ekaerIds.ekaerId',
  'invoiceSummary.summaryNormal.summaryByVatRate',
  'invoiceSummary.summarySimplified',
];

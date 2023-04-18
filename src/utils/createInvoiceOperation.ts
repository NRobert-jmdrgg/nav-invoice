import { createHash } from 'crypto';
import { InvoiceData } from '../operations/types/invoiceData';
import { InvoiceOperation, InvoiceOperationObj } from '../operations/types/requestProps';
import { utf8ToBase64 } from './base64';
import writeToXML from './writeToXML';
import { compressData } from './gzip';

export type InvoiceOperationProps = {
  invoiceOperation: InvoiceOperation;
  invoiceData: InvoiceData;
};

export default function createInvoiceOperation(
  compressedContet: boolean,
  invoiceOperations: InvoiceOperationProps[]
): InvoiceOperationObj[] {
  return invoiceOperations.map((operations, index) => {
    // write to xml string
    let invoiceData = writeToXML(operations.invoiceData);

    // compress
    if (compressedContet) {
      invoiceData = compressData(Buffer.from(invoiceData, 'utf-8'));
    }

    // base64
    invoiceData = utf8ToBase64(invoiceData);

    let invoiceOperationObj: InvoiceOperationObj = {
      index: index + 1,
      invoiceOperation: operations.invoiceOperation,
      invoiceData: invoiceData,
    };

    // sha3-512 if completenessIndicator is set to true
    if (operations.invoiceData.InvoiceData.completenessIndicator) {
      const hash = createHash('sha3-512');
      invoiceOperationObj.electronicInvoiceHash = {
        $cryptoType: 'SHA3-512',
        _: hash.update(invoiceData).digest('hex').toUpperCase(),
      };
    }

    return invoiceOperationObj;
  });
}

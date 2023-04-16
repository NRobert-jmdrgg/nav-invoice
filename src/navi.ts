import { Software, User } from './baseTypes';
import { manageAnnulmentRequest } from './operations/manageAnnulment';
import manageInvoiceRequest from './operations/manageInvoice';
import queryInvoiceChainDigestRequest from './operations/queryInvoiceChainDigest';
import queryInvoiceCheckRequest from './operations/queryInvoiceCheck';
import queryInvoiceDataRequest from './operations/queryInvoiceData';
import queryInvoiceDigestRequest from './operations/queryInvoiceDigest';
import queryTaxpayerRequest from './operations/queryTaxpayer';
import queryTransactionListRequest from './operations/queryTransactionList';
import queryTransactionStatusRequest from './operations/queryTransactionStatus';
import tokenExchangeRequest from './operations/tokenExchange';

import {
  AdditionalQueryParams,
  annulmentOperation,
  InvoiceChainQuery,
  InvoiceDirection,
  InvoiceNumberQuery,
  InvoiceOperationObj,
  InvoiceQueryParams,
  ManageAnnulmentProps,
  ManageInvoiceProps,
  MandatoryQueryParams,
  QueryInvoiceChainDigestProps,
  QueryInvoiceCheckProps,
  QueryInvoiceDataProps,
  QueryInvoiceDigestProps,
  QueryTaxpayerProps,
  QueryTransactionListProps,
  QueryTransactionStatusProps,
  RelationalQueryParams,
  RequestStatus,
  TransactionQueryParams,
} from './operations/types/requestProps';

import readInvoiceData from './utils/readInvoiceData';
export type NaviOptions = {
  returnWithXml?: boolean;
  testing?: boolean;
};

export class Navi {
  private user: User;
  private software: Software;
  private options?: NaviOptions;

  constructor(user: User, software: Software, options?: NaviOptions) {
    this.user = user;
    this.software = software;
    this.options = options;
  }

  private async tokenExchange() {
    const response = await tokenExchangeRequest(this.user, this.software, this.options);

    if (!response) {
      throw new Error('Invalid exchange token');
    }

    return response;
  }

  async manageAnnulment(annulmentOperations: annulmentOperation[]) {
    const exchangeToken = await this.tokenExchange();

    let manageAnnulmentOptions: ManageAnnulmentProps = {
      exchangeToken: exchangeToken,
      annulmentOperations: { annulmentOperation: annulmentOperations },
    };
    const response = await manageAnnulmentRequest(this.user, this.software, manageAnnulmentOptions, this.options);

    return response;
  }

  async manageInvoice(compressedContent: boolean, invoiceOperation: InvoiceOperationObj[]) {
    const exchangeToken = await this.tokenExchange();

    let manageInvoiceOptions: ManageInvoiceProps = {
      exchangeToken: exchangeToken,
      invoiceOperations: { compressedContent, invoiceOperation },
    };

    const response = manageInvoiceRequest(this.user, this.software, manageInvoiceOptions, this.options);
    return response;
  }

  async queryInvoiceChainDigest(page: number, invoiceChainQuery: InvoiceChainQuery) {
    let queryInvoiceChainDigestOptions: QueryInvoiceChainDigestProps = {
      page,
      invoiceChainQuery,
    };

    const response = queryInvoiceChainDigestRequest(
      this.user,
      this.software,
      queryInvoiceChainDigestOptions,
      this.options
    );

    return response;
  }

  async queryInvoiceCheck(invoiceNumberQuery: InvoiceNumberQuery) {
    let queryInvoiceCheckOptions: QueryInvoiceCheckProps = {
      invoiceNumberQuery,
    };

    const response = await queryInvoiceCheckRequest(this.user, this.software, queryInvoiceCheckOptions, this.options);

    return response;
  }

  /**
   *
   * @param {string} invoiceNumber - A keresett számla száma
   * @param {InvoiceDirection} invoiceDirection - A keresés iránya, a keresés elvégezhető kiállítóként és vevőként is
   * @param {string} batchIndex - A módosító okirat sorszáma kötegelt módosítás esetén
   * @param {string} supplierTaxNumber - A kiállító adószáma vevő oldali keresés esetén
   * @returns
   */
  async queryInvoiceData(
    invoiceNumber: string,
    invoiceDirection: InvoiceDirection,
    batchIndex?: string,
    supplierTaxNumber?: string
  ) {
    let queryInvoiceDataOptions: QueryInvoiceDataProps = {
      invoiceNumberQuery: {
        invoiceDirection,
        invoiceNumber,
        batchIndex,
        supplierTaxNumber,
      },
    };

    const response = await queryInvoiceDataRequest(this.user, this.software, queryInvoiceDataOptions, this.options);
    let decryptedInvoiceData;
    if (response?.invoiceDataResult) {
      const { invoiceData, compressedContentIndicator } = response.invoiceDataResult;
      decryptedInvoiceData = await readInvoiceData(invoiceData, compressedContentIndicator);
    }
    return { ...response, decryptedInvoiceData };
  }

  async queryInvoiceDigest(
    page: number,
    invoiceDirection: InvoiceDirection,
    mandatoryQueryParams: MandatoryQueryParams,
    additionalQueryParams?: AdditionalQueryParams,
    relationalQueryParams?: RelationalQueryParams,
    transactionQueryParams?: TransactionQueryParams
  ) {
    let invoiceQueryParams: InvoiceQueryParams = {
      mandatoryQueryParams,
      additionalQueryParams,
      relationalQueryParams,
      transactionQueryParams,
    };

    let queryInvoiceDigestOptions: QueryInvoiceDigestProps = {
      page,
      invoiceDirection,
      invoiceQueryParams,
    };

    const response = queryInvoiceDigestRequest(this.user, this.software, queryInvoiceDigestOptions, this.options);

    return response;
  }

  async queryTaxpayer(taxNumber: string) {
    let queryTaxpayerOptions: QueryTaxpayerProps = {
      taxNumber,
    };

    const response = await queryTaxpayerRequest(this.user, this.software, queryTaxpayerOptions, this.options);

    return response;
  }

  async queryTransactionList(page: number, dateTimeFrom: Date, dateTimeTo: Date, requestStatus?: RequestStatus) {
    let queryTransactionListOptions: QueryTransactionListProps = {
      page,
      insDate: {
        dateTimeFrom,
        dateTimeTo,
      },
      requestStatus,
    };

    const response = await queryTransactionListRequest(
      this.user,
      this.software,
      queryTransactionListOptions,
      this.options
    );

    return response;
  }

  async queryTransactionStatus(transactionId: string, returnOriginalRequest?: boolean) {
    let queryTransactionStatusOptions: QueryTransactionStatusProps = {
      transactionId,
      returnOriginalRequest,
    };

    const response = await queryTransactionStatusRequest(
      this.user,
      this.software,
      queryTransactionStatusOptions,
      this.options
    );

    return response;
  }
}

import { InvoiceChainQuery } from './requestProps';

export type User = {
  login: string;
  password: string;
  taxNumber: string;
  exchangeKey: string;
  signatureKey: string;
};

type SoftwareOperationType = 'LOCAL_SOFTWARE' | 'ONLINE_SERVICE';

export type Software = {
  softwareId: string; // A számlázó program azonosítója
  softwareName: string; // A számlázó program neve
  softwareOperation: SoftwareOperationType; // A számlázó program működési típusa
  softwareMainVersion: string; // A számlázó program fő verziója
  softwareDevName: string; // A számlázó program fejlesztőjének neve;
  softwareDevContact: string; // A számlázó program fejlesztőjének működő email címe
  softwareDevCountryCode?: string; // A számlázó program fejlesztőjének országkódja;
  softwareDevTaxNumber?: string; // A számlázó program fejlesztőjének adószáma;
};

export type NaviOptions = {
  returnWithXml?: boolean;
  testing?: boolean;
};

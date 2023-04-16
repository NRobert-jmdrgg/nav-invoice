/**
 * alap típusok a nav operációkhoz
 */

export type User = {
  login: string;
  password: string;
  taxNumber: string;
  exchangeKey: string;
  signatureKey: string;
};

// type SoftwareOperationType = 'LOCAL_SOFTWARE' | 'ONLINE_SERVICE';

export type Software = {
  softwareId: string; // A számlázó program azonosítója
  softwareName: string; // A számlázó program neve
  softwareOperation: string; // A számlázó program működési típusa
  softwareMainVersion: string; // A számlázó program fő verziója
  softwareDevName: string; // A számlázó program fejlesztőjének neve;
  softwareDevContact: string; // A számlázó program fejlesztőjének működő email címe
  softwareDevCountryCode?: string; // A számlázó program fejlesztőjének országkódja;
  softwareDevTaxNumber?: string; // A számlázó program fejlesztőjének adószáma;
};

// export type resSoftware = {
//   softwareId: [string]; // A számlázó program azonosítója
//   softwareName: [string]; // A számlázó program neve
//   softwareOperation: [string]; // A számlázó program működési típusa
//   softwareMainVersion: [string]; // A számlázó program fő verziója
//   softwareDevName: [string]; // A számlázó program fejlesztőjének neve;
//   softwareDevContact: [string]; // A számlázó program fejlesztőjének működő email címe
//   softwareDevCountryCode?: [string]; // A számlázó program fejlesztőjének országkódja;
//   softwareDevTaxNumber?: [string]; // A számlázó program fejlesztőjének adószáma;
// };

export type BasicHeader = {
  requestId: string; // A kérés egyedi azonosítója
  timestamp: string; // A kérés kliensoldali időpontja UTC-ben
  requestVersion: string; // A kérés verziószáma
  headerVersion?: string; // A header verziószáma
};

export type CommonBasicHeader = {
  'common:requestId': string; // A kérés egyedi azonosítója
  'common:timestamp': string; // A kérés kliensoldali időpontja UTC-ben
  'common:requestVersion': string; // A kérés verziószáma
  'common:headerVersion'?: string; // A header verziószáma
};

export type UserHeader = {
  'common:login': string; // A technikai felhasználó login neve
  'common:passwordHash': {
    // A technikai felhasználó jelszóhash értéke
    $: {
      cryptoType: string;
    };
    _: string;
  };
  //Azon adózó adószámának első 8 jegye,
  //aki az interfész szolgáltatását igénybe
  //veszi, és akihez a technikai felhasználó
  //tartozik
  'common:taxNumber': string;
  'common:requestSignature': {
    // A kérés aláírásának hash értéke
    $: {
      cryptoType: string;
    };
    _: string;
  };
};

export type InvoiceRequest = {
  [requestName: string]: {
    $: {
      'xmlns:common': string;
      xmlns: string;
    };
    'common:header': CommonBasicHeader;
    'common:user': UserHeader;
    software: Software;
  };
};

type Notification = {
  notificationCode: string; // Értesítés kód
  notificationText: string; // Értesítés szöveg
};

type Notifications = {
  notification: Notification[];
};

export type BasicResult = {
  funcCode: string; // A feldolgozás eredménye
  errorCode?: string; // A feldolgozás hibakódja
  message?: string; // A feldolgozási eredményhez vagy hibakódhoz tartozó szöveges üzenet
  notifications: Notifications;
};

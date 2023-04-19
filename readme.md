# nav-invoice

Nav-invoice is a Node.js module that provides an interface to connect to the NAV online invoicing system using the official NAV Invoice API.

## Install

```bash
npm i nav-invoice
```

### Usage

```js
import { Navi, NaviOptions } from 'nav-invoice';

const technicalUser: User = {
  login: 'login',
  password: 'password',
  taxNumber: 'taxNumber',
  exchangeKey: 'exchange key',
  signatureKey: 'signature key',
};

const software: Software = {
  softwareId: 'software id',
  softwareName: 'software name',
  softwareOperation: 'LOCAL_SOFTWARE',
  softwareMainVersion: 'version',
  softwareDevName: 'dev name',
  softwareDevContact: 'dev contact',
  softwareDevCountryCode: 'HU',
  softwareDevTaxNumber: 'tax number',
};

const options = { returnWithXml: false, testing: true };

const navi = new Navi(user, software, options);
```

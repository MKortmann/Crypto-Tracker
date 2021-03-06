// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiId = 'nxwvwkfq98';
const aws = 'execute-api.eu-central-1.amazonaws.com';

export const environment = {
  production: false,
  auth: {
    domain: 'dev-oeeh6hdb.eu.auth0.com',
    clientId: 'Ti2w3qtNUsaBZMTdz3t63QQJhSPQDOAU',
    redirectUri: 'http://localhost:4200',
  },
  access_key: '120b00ab3099aa8686cfbdc1cecb2eae',
  ctBackend: {
    url: `https://${apiId}.${aws}/dev/trades`,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

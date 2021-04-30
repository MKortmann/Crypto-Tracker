const apiId = 'nxwvwkfq98';
const aws = 'execute-api.eu-central-1.amazonaws.com';

export const environment = {
  production: true,
  auth: {
    domain: 'dev-oeeh6hdb.eu.auth0.com',
    clientId: 'Ti2w3qtNUsaBZMTdz3t63QQJhSPQDOAU',
    redirectUri: 'https://mkortmann.github.io/Crypto-Tracker',
  },
  access_key: '120b00ab3099aa8686cfbdc1cecb2eae',
  ctBackend: {
    url: `https://${apiId}.${aws}/dev/trades`,
  },
};

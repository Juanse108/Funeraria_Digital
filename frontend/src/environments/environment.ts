// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  url_ms_negocio:"http://127.0.0.1:3333",
  url_ms_security:"http://127.0.0.1:8181",
  url_sustentacion: "https://f438ddc5-acac-42a2-8b86-967466f491a1.mock.pstmn.io",
  url_chat: "http://127.0.0.1:3000",

  // ePayco
  EPAYCO_P_CUST_ID_CLIENTE: '1469899',
  EPAYCO_P_KEY: 'beea7170912ac2bf36504c0b836d133ec8d876de',
  EPAYCO_PRIVATE_KEY: '4a4db8a6e0226f8929dc2a2ec1eec71f',
  EPAYCO_PUBLIC_KEY: 'be2f71c6231b637cca0a4a2c19866a40',
  
  EPAYCO_CHECKOUT_URL: '',
  EPAYCO_RESPONSE_URL: '',
  EPAYCO_CONFIRMATION_URL: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

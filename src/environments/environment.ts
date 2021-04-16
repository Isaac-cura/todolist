
import { Environment } from './../app/models/environments.models';
import { UtilEnums } from './../app/enums/util.enums';

export const environment: Environment = {
  production: false, 
  timeToAskSession: UtilEnums.MillisecondTime.minute * 4,
  timeToExpireSession: UtilEnums.MillisecondTime.minute,
  apiBase: 'https://mocki.io/v1/fdc94f84-fc0b-4bff-94c1-c95a4c1d43f2',
  userEndpoint: "/v1/fdc94f84-fc0b-4bff-94c1-c95a4c1d43f2"
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

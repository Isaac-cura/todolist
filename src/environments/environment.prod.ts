
import { Environment } from './../app/models/environments.models';
import { UtilEnums } from './../app/enums/util.enums';

export const environment: Environment = {
  production: false, 
  timeToAskSession: UtilEnums.MillisecondTime.minute * 4,
  timeToExpireSession: UtilEnums.MillisecondTime.minute,
  apiBase: 'https://mocki.io/v1/fdc94f84-fc0b-4bff-94c1-c95a4c1d43f2',
  userEndpoint: "/v1/fdc94f84-fc0b-4bff-94c1-c95a4c1d43f2"
};

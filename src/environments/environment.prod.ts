
import { Environment } from './../app/models/environments.models';
import { UtilEnums } from './../app/enums/util.enums';

export const environment: Environment = {
  production: false, 
  timeToAskSession: UtilEnums.MillisecondTime.minute * 4,
  timeToExpireSession: UtilEnums.MillisecondTime.minute * 5
};

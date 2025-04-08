import { createMongoConfig } from '@avylando/config';
import { AccountConfigNamespace } from '../account-config.constants';

const registerConfig = createMongoConfig();

export default registerConfig(AccountConfigNamespace.MONGO);

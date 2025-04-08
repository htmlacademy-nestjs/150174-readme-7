import { createAppBaseConfig } from '@avylando/config';
import { AccountConfigNamespace } from '../account-config.constants';

const registerConfig = createAppBaseConfig();

export default registerConfig(AccountConfigNamespace.APP);

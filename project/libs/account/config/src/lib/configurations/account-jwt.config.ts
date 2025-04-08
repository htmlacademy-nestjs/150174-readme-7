import { createJwtConfig } from '@avylando/config';
import { AccountConfigNamespace } from '../account-config.constants';

const registerConfig = createJwtConfig();

export default registerConfig(AccountConfigNamespace.JWT);

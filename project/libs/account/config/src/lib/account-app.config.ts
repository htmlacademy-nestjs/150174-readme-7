import { createAppBaseConfig } from '@avylando/config';
import { AccountConfigNamespace } from './account-config.constants';

async function bootstrap() {
  const registerConfig = await createAppBaseConfig();

  return registerConfig(AccountConfigNamespace.APP);
}

export default bootstrap();

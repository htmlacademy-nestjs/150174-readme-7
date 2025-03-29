import { createMongoConfig } from '@avylando/config';
import { AccountConfigNamespace } from '../account-config.constants';

async function bootstrap() {
  const registerConfig = await createMongoConfig();

  return registerConfig(AccountConfigNamespace.MONGO);
}

export default bootstrap();

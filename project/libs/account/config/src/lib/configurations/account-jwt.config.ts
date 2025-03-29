import { createJwtConfig } from '@avylando/config';
import { AccountConfigNamespace } from '../account-config.constants';

async function bootstrap() {
  const registerConfig = await createJwtConfig();

  return registerConfig(AccountConfigNamespace.JWT);
}

export default bootstrap();

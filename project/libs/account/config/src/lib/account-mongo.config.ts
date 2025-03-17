import { createMongoConfig } from '@avylando/config';

async function bootstrap() {
  const registerConfig = await createMongoConfig();

  return registerConfig('account-db');
}

export default bootstrap();

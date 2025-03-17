import { createMongoConfig } from '@avylando/config';

async function bootstrap() {
  const registerConfig = await createMongoConfig();

  return registerConfig('blog-db');
}

export default bootstrap();

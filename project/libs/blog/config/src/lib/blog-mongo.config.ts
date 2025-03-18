import { createMongoConfig } from '@avylando/config';
import { BlogConfigNamespace } from './blog-config.constants';

async function bootstrap() {
  const registerConfig = await createMongoConfig();

  return registerConfig(BlogConfigNamespace.MONGO);
}

export default bootstrap();

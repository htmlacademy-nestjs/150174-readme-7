import { createPostgresConfig } from '@avylando/config';
import { BlogConfigNamespace } from './blog-config.constants';

async function bootstrap() {
  const registerConfig = await createPostgresConfig();

  return registerConfig(BlogConfigNamespace.DB);
}

export default bootstrap();

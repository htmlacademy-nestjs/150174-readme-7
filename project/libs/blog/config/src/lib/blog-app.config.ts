import { createAppBaseConfig } from '@avylando/config';
import { BlogConfigNamespace } from './blog-config.constants';

async function bootstrap() {
  const registerConfig = await createAppBaseConfig();

  return registerConfig(BlogConfigNamespace.APP);
}

export default bootstrap();

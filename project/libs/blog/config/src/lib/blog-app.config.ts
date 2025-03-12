import { createAppBaseConfig } from '@avylando/config';

async function bootstrap() {
  const registerConfig = await createAppBaseConfig();

  return registerConfig('blog');
}

export default bootstrap();

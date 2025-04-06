import { createMongoConfig } from '@avylando/config';
import { FileStorageConfigNamespace } from '../file-storage-config.constants';

async function bootstrap() {
  const registerConfig = await createMongoConfig();

  return registerConfig(FileStorageConfigNamespace.MONGO);
}

export default bootstrap();

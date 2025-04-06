import {
  AppBaseConfig,
  AppBaseConfigSchema,
  createAppBaseConfig,
} from '@avylando/config';
import { FileStorageConfigNamespace } from '../file-storage-config.constants';

interface FileStorageAppConfig extends AppBaseConfig {
  uploadDirectory: string;
}

class FileStorageAppConfigSchema extends AppBaseConfigSchema {
  uploadDirectory: string;
}
async function bootstrap() {
  const registerConfig = await createAppBaseConfig<FileStorageAppConfig>();

  return registerConfig(FileStorageConfigNamespace.APP);
}

export default bootstrap();

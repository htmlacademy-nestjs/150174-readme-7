import { AppBaseConfig, MongoConfig } from '@avylando/config';

interface FileStorageConfig extends AppBaseConfig, MongoConfig {
  uploadDirectory: string;
}

export type { FileStorageConfig };

import { AppBaseConfig, MongoConfig } from '@avylando/config';

interface FileStorageAppConfig extends AppBaseConfig {
  uploadDirectory: string;
}

interface FileStorageConfig extends FileStorageAppConfig, MongoConfig {}

export type { FileStorageConfig, FileStorageAppConfig };

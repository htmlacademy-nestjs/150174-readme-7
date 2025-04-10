import { AppBaseConfig, MongoConfig } from '@avylando/config';

interface FileStorageAppConfig extends AppBaseConfig {
  uploadDir: string;
  avatarsDir: string;
  postsAssetsRoot: string;
  postsVideosDir: string;
  postsImagesDir: string;
}

interface FileStorageConfig extends FileStorageAppConfig, MongoConfig {}

export type { FileStorageConfig, FileStorageAppConfig };

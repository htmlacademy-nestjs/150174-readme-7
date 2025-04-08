export * from './lib/file-storage-config.module';

export { FileStorageConfigNamespace } from './lib/file-storage-config.constants';

export { getFileStorageMongooseOptions } from './lib/get-mongoose-options';
export type { FileStorageConfig } from './lib/file-storage-config.interface';

import { default as FileStorageAppConfig } from './lib/configurations/file-storage-app.config';

const AwaitedFileStorageAppConfig = FileStorageAppConfig as unknown as Awaited<
  typeof FileStorageAppConfig
>;

export { AwaitedFileStorageAppConfig as FileStorageAppConfig };

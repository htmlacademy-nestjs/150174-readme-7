export * from './lib/file-storage-config.module';

export { FileStorageConfigNamespace } from './lib/file-storage-config.constants';

export { getFileStorageMongooseOptions } from './lib/get-mongoose-options';
export type { FileStorageConfig } from './lib/file-storage-config.interface';

export { default as FileStorageAppConfig } from './lib/configurations/file-storage-app.config';

export {
  default as FileStorageRabbitConfig,
  getFileStorageRabbitMQOptions,
  FileStorageRabbitHandlerName,
} from './lib/configurations/file-storage-rabbit.config';

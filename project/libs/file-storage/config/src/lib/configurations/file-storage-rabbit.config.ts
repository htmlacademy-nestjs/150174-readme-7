import {
  createRabbitMqConfig,
  getRabbitMQOptions,
  RabbitMqConfig,
} from '@avylando/config';
import { FileStorageConfigNamespace } from '../file-storage-config.constants';

export const FileStorageRabbitHandlerName = {} as const;

export const getFileStorageRabbitMQOptions = () =>
  getRabbitMQOptions<typeof FileStorageConfigNamespace.RABBIT, RabbitMqConfig>(
    FileStorageConfigNamespace.RABBIT,
    (configService) => ({
      handlers: {},
    })
  );

const registerConfig = createRabbitMqConfig();

export default registerConfig(FileStorageConfigNamespace.RABBIT);

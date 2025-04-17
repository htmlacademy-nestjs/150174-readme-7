import {
  createRabbitMqConfig,
  getRabbitMQOptions,
  RabbitMqConfig,
} from '@avylando/config';
import { FileStorageConfigNamespace } from '../file-storage-config.constants';
import { RabbitMqRouting } from '@avylando-readme/core';

export const FileStorageRabbitHandlerName = {
  NOTIFY_AVATAR_UPLOADED: 'handleUploadAvatar',
} as const;

export const getFileStorageRabbitMQOptions = () =>
  getRabbitMQOptions<typeof FileStorageConfigNamespace.RABBIT, RabbitMqConfig>(
    FileStorageConfigNamespace.RABBIT,
    (configService) => ({
      handlers: {
        [FileStorageRabbitHandlerName.NOTIFY_AVATAR_UPLOADED]: {
          exchange: configService.get<string>(
            `${FileStorageConfigNamespace.RABBIT}.exchange`
          ),
          routingKey: RabbitMqRouting.UploadAvatar,
          allowNonJsonMessages: true,
        },
      },
    })
  );

const registerConfig = createRabbitMqConfig();

export default registerConfig(FileStorageConfigNamespace.RABBIT);

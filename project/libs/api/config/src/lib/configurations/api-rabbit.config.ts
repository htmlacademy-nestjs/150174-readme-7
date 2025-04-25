import {
  createRabbitMqConfig,
  getRabbitMQOptions,
  RabbitMqConfig,
  RabbitMqConfigurationSchema,
} from '@avylando/config';
import { ApiConfigNamespace } from '../api-config.constants';
import { RabbitMqRouting } from '@avylando-readme/core';
import { IsString } from 'class-validator';
import { ApiRabbitConfig } from '../api-config.interface';

class FileStorageRabbitConfigSchema
  extends RabbitMqConfigurationSchema
  implements ApiRabbitConfig
{
  @IsString({
    message: 'FILE_STORAGE_RABBI_QUEUE is required',
  })
  fileStorageRabbitQueue: string;
}

const registerConfig = createRabbitMqConfig(FileStorageRabbitConfigSchema, {
  fileStorageRabbitQueue: { envVariable: 'FILE_STORAGE_RABBIT_QUEUE' },
});

export const ApiRabbitHandlerName = {} as const;

export const getApiRabbitMQOptions = () =>
  getRabbitMQOptions<
    typeof ApiConfigNamespace.RABBIT,
    RabbitMqConfig & ApiRabbitConfig
  >(ApiConfigNamespace.RABBIT, (configService) => ({
    handlers: {},
  }));

export default registerConfig(ApiConfigNamespace.RABBIT);

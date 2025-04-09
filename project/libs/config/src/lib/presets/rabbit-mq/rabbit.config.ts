import { registerAs } from '@nestjs/config';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { DEFAULT_RABBIT_PORT } from './rabbit.const';
import { RabbitMqConfigurationSchema } from './rabbit.schema';
import { RabbitMqConfig } from './rabbit-config.interface';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../../config-extensions.type';
import { getConfigWithExtensions } from '../../utils/get-config-with-extensions';

function getRabbitMqConfig<Extensions extends ConfigExtensions>(
  schema: typeof RabbitMqConfigurationSchema = RabbitMqConfigurationSchema,
  extensions?: Extensions
): RabbitMqConfig & GetConfigFromExtensions<Extensions> {
  const config: RabbitMqConfig = plainToClass(schema, {
    host: process.env.RABBIT_HOST,
    queue: process.env.RABBIT_QUEUE,
    port: process.env.RABBIT_PORT
      ? parseInt(process.env.RABBIT_PORT, 10)
      : DEFAULT_RABBIT_PORT,
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
  });

  return getConfigWithExtensions(config, schema, extensions);
}

function createRabbitMqConfig(
  schema: ClassConstructor<RabbitMqConfigurationSchema> = RabbitMqConfigurationSchema,
  extensions?: ConfigExtensions
) {
  return (name: string) =>
    registerAs(name, () => getRabbitMqConfig(schema, extensions));
}

export { createRabbitMqConfig };

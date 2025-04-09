import { registerAs } from '@nestjs/config';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { DEFAULT_POSTGRES_PORT } from './postgres.const';
import { PostgresConfigurationSchema } from './postgres.schema';
import { PostgresConfig } from './postgres-config.interface';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../../config-extensions.type';
import { getConfigWithExtensions } from '../../utils/get-config-with-extensions';

function getDbConfig<Extensions extends ConfigExtensions>(
  schema: typeof PostgresConfigurationSchema = PostgresConfigurationSchema,
  extensions?: Extensions
): PostgresConfig & GetConfigFromExtensions<Extensions> {
  const config: PostgresConfig = plainToClass(schema, {
    host: process.env.POSTGRES_HOST,
    name: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : DEFAULT_POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  return getConfigWithExtensions(config, schema, extensions);
}

function createPostgresConfig(
  schema: ClassConstructor<PostgresConfigurationSchema> = PostgresConfigurationSchema,
  extensions?: ConfigExtensions
) {
  return (name: string) =>
    registerAs(name, () => getDbConfig(schema, extensions));
}

export { createPostgresConfig };

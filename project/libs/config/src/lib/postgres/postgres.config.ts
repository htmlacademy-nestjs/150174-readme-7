import { registerAs } from '@nestjs/config';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { DEFAULT_POSTGRES_PORT } from './postgres.const';
import { PostgresConfigurationSchema } from './postgres.schema';
import { PostgresConfig } from './postgres-config.interface';

async function getDbConfig<Config extends PostgresConfig>(
  extendedConfig: Config = {} as Config,
  schema: typeof PostgresConfigurationSchema = PostgresConfigurationSchema
): Promise<Config> {
  const config = plainToClass(schema, {
    host: process.env.POSTGRES_HOST,
    name: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : DEFAULT_POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ...extendedConfig,
  }) as unknown as Config;
  const instance = plainToClass(schema, config);

  await instance.validate();

  return config;
}

async function createPostgresConfig<Config extends PostgresConfig>(
  extendedConfig: Config = {} as Config,
  schema: ClassConstructor<PostgresConfigurationSchema> = PostgresConfigurationSchema
) {
  return (name: string) =>
    registerAs(name, async () => getDbConfig(extendedConfig, schema));
}

export { createPostgresConfig };

import { ClassConstructor, plainToClass } from 'class-transformer';
import { AppBaseConfig, Environment } from './app-base.interface';
import { AppBaseConfigSchema } from './app-base.schema';
import { DEFAULT_PORT } from './app-base.const';
import { registerAs } from '@nestjs/config';

async function getAppBaseConfig<Config extends AppBaseConfig>(
  extendedConfig: Config = {} as Config,
  schema: typeof AppBaseConfigSchema = AppBaseConfigSchema
): Promise<Config> {
  const config: Config = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    globalPrefix: process.env.GLOBAL_PREFIX,
    ...extendedConfig,
  };

  const instance = plainToClass(schema, config);

  await instance.validate();

  return config;
}

async function createAppBaseConfig<Config extends AppBaseConfig>(
  extendedConfig: Config = {} as Config,
  schema: ClassConstructor<AppBaseConfigSchema> = AppBaseConfigSchema
) {
  return (name: string) =>
    registerAs(name, async () => getAppBaseConfig(extendedConfig, schema));
}

export { createAppBaseConfig };

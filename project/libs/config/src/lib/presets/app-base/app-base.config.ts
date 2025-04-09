import { ClassConstructor } from 'class-transformer';
import { AppBaseConfig, Environment } from './app-base.interface';
import { AppBaseConfigSchema } from './app-base.schema';
import { DEFAULT_PORT } from './app-base.const';
import { registerAs } from '@nestjs/config';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../../config-extensions.type';
import { getConfigWithExtensions } from '../../utils/get-config-with-extensions';

function getAppBaseConfig<Extensions extends ConfigExtensions>(
  schema: typeof AppBaseConfigSchema = AppBaseConfigSchema,
  extensions?: Extensions
): AppBaseConfig & GetConfigFromExtensions<Extensions> {
  const config: AppBaseConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
    globalPrefix: process.env.GLOBAL_PREFIX,
  };

  return getConfigWithExtensions(config, schema, extensions);
}

function createAppBaseConfig<
  Extensions extends ConfigExtensions = ConfigExtensions
>(
  schema: ClassConstructor<AppBaseConfigSchema> = AppBaseConfigSchema,
  extensions?: Extensions
) {
  return (name: string) =>
    registerAs(name, () => getAppBaseConfig(schema, extensions));
}

export { createAppBaseConfig };

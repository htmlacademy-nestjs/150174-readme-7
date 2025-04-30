import { ConfigSchema } from '@avylando-readme/core';
import {
  ConfigExtensions,
  GetConfigFromExtensions,
} from '../config-extensions.type';
import { ClassConstructor, plainToClass } from 'class-transformer';

const extractProcessEnv = <T extends ConfigExtensions>(
  extensions: T
): GetConfigFromExtensions<T> => {
  const result = {} as GetConfigFromExtensions<T>;
  for (const key in extensions) {
    const { envVariable, defaultValue, transform } = extensions[key];
    const value = transform
      ? transform(process.env[envVariable])
      : process.env[envVariable];
    result[key] = value || defaultValue;
  }
  return result;
};

function createExtendedConfig<
  Config extends {},
  Extensions extends ConfigExtensions
>(
  config: Config,
  extensions: ConfigExtensions
): Config & GetConfigFromExtensions<Extensions> {
  const extendedConfig = extractProcessEnv(extensions);
  return {
    ...config,
    ...extendedConfig,
  } as Config & GetConfigFromExtensions<Extensions>;
}

function getConfigWithExtensions<
  Config extends {},
  Extensions extends ConfigExtensions
>(
  config: Config,
  schema: ClassConstructor<ConfigSchema>,
  extensions?: Extensions
): Config & GetConfigFromExtensions<Extensions> {
  const extendedConfig = createExtendedConfig(config, extensions);

  const instance = plainToClass(schema, extendedConfig);

  instance.validate();

  return extendedConfig as Config & GetConfigFromExtensions<Extensions>;
}

export { getConfigWithExtensions };

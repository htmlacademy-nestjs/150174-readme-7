export * from './lib/api-config.module';

export {
  ApiConfigNamespace,
  API_SERVICES_PROVIDER_NAME,
} from './lib/api-config.constants';

export { ApiServicesProvider } from './lib/api-config.provider';
export type { ApiServicesConfig } from './lib/api-config.provider';

export {
  default as ApiRabbitConfig,
  getApiRabbitMQOptions,
  ApiRabbitHandlerName,
} from './lib/configurations/api-rabbit.config';

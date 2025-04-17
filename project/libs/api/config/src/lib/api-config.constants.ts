import { ApiAppConfig } from './api-config.interface';

const ApiConfigNamespace = {
  APP: 'api-app',
  RABBIT: 'api-rabbit-mq',
} as const;

const ApiConfigErrorMessages: Record<keyof ApiAppConfig, string> = {
  accountPort: 'accountPort is required',
  accountHost: 'accountHost is required',
  accountPath: 'accountPath is required',

  blogPort: 'blogPort is required',
  blogHost: 'blogHost is required',
  blogPath: 'blogPath is required',

  fileStoragePort: 'fileStoragePort is required',
  fileStorageHost: 'fileStorageHost is required',
  fileStoragePath: 'fileStoragePath is required',

  notificationPort: 'notificationPort is required',
  notificationHost: 'notificationHost is required',
  notificationPath: 'notificationPath is required',
};

const API_SERVICES_PROVIDER_NAME = 'API_SERVICES_PROVIDER';

export {
  ApiConfigNamespace,
  ApiConfigErrorMessages,
  API_SERVICES_PROVIDER_NAME,
};

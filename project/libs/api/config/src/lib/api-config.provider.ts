import { Provider } from '@nestjs/common';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiConfigNamespace,
} from './api-config.constants';
import { ConfigService } from '@nestjs/config';

const buildServiceUri = (host: string, port: number, path: string) => {
  return `http://${host}:${port}/${path}`;
};

interface ApiServicesConfig {
  accountServiceUri: string;
  blogServiceUri: string;
  fileStorageServiceUri: string;
  notificationServiceUri: string;
}

const ApiServicesProvider: Provider = {
  provide: API_SERVICES_PROVIDER_NAME,
  useFactory: (configService: ConfigService): ApiServicesConfig => {
    return {
      accountServiceUri: buildServiceUri(
        configService.get<string>(`${ApiConfigNamespace.APP}.accountHost`),
        configService.get<number>(`${ApiConfigNamespace.APP}.accountPort`),
        configService.get<string>(`${ApiConfigNamespace.APP}.accountPath`)
      ),
      blogServiceUri: buildServiceUri(
        configService.get<string>(`${ApiConfigNamespace.APP}.blogHost`),
        configService.get<number>(`${ApiConfigNamespace.APP}.blogPort`),
        configService.get<string>(`${ApiConfigNamespace.APP}.blogPath`)
      ),
      fileStorageServiceUri: buildServiceUri(
        configService.get<string>(`${ApiConfigNamespace.APP}.fileStorageHost`),
        configService.get<number>(`${ApiConfigNamespace.APP}.fileStoragePort`),
        configService.get<string>(`${ApiConfigNamespace.APP}.fileStoragePath`)
      ),
      notificationServiceUri: buildServiceUri(
        configService.get<string>(`${ApiConfigNamespace.APP}.notificationHost`),
        configService.get<number>(`${ApiConfigNamespace.APP}.notificationPort`),
        configService.get<string>(`${ApiConfigNamespace.APP}.notificationPath`)
      ),
    };
  },
  inject: [ConfigService],
};

export { ApiServicesProvider };
export type { ApiServicesConfig };

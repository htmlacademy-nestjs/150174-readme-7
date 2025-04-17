import { RabbitMqConfig } from '@avylando/config';

interface ApiAppConfig {
  accountPort: number;
  accountHost: string;
  accountPath: string;

  blogPort: number;
  blogHost: string;
  blogPath: string;

  fileStoragePort: number;
  fileStorageHost: string;
  fileStoragePath: string;

  notificationPort: number;
  notificationHost: string;
  notificationPath: string;
}

type ApiRabbitConfig = {
  fileStorageRabbitQueue: string;
};

export type { ApiAppConfig, ApiRabbitConfig };

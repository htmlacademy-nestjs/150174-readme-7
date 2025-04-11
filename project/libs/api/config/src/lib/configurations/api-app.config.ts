import { AppBaseConfigSchema, createAppBaseConfig } from '@avylando/config';
import {
  ApiConfigErrorMessages,
  ApiConfigNamespace,
} from '../api-config.constants';
import { IsNumber, IsString, Max, Min } from 'class-validator';
import { MAX_PORT, MIN_PORT } from '@avylando-readme/core';
import { ApiAppConfig } from './api-app-config.interface';
import { ConfigExtentionOptions } from 'libs/config/src/lib/config-extensions.type';

class ApiAppConfigSchema extends AppBaseConfigSchema implements ApiAppConfig {
  @IsNumber(
    {},
    {
      message: ApiConfigErrorMessages.accountPort,
    }
  )
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  accountPort: number;

  @IsString({
    message: ApiConfigErrorMessages.accountHost,
  })
  accountHost: string;

  @IsString({
    message: ApiConfigErrorMessages.accountPath,
  })
  accountPath: string;

  @IsNumber({}, { message: ApiConfigErrorMessages.blogPort })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  blogPort: number;

  @IsString({
    message: ApiConfigErrorMessages.blogHost,
  })
  blogHost: string;

  @IsString({
    message: ApiConfigErrorMessages.blogPath,
  })
  blogPath: string;

  @IsNumber({}, { message: ApiConfigErrorMessages.fileStorageHost })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  fileStoragePort: number;

  @IsString({
    message: ApiConfigErrorMessages.fileStorageHost,
  })
  fileStorageHost: string;

  @IsString({
    message: ApiConfigErrorMessages.fileStoragePath,
  })
  fileStoragePath: string;

  @IsNumber({}, { message: ApiConfigErrorMessages.notificationPort })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  notificationPort: number;

  @IsString({
    message: ApiConfigErrorMessages.notificationHost,
  })
  notificationHost: string;

  @IsString({
    message: ApiConfigErrorMessages.notificationPath,
  })
  notificationPath: string;

  constructor() {
    super('ApiAppConfigSchema');
  }
}

const registerConfig = createAppBaseConfig<
  Record<keyof ApiAppConfig, ConfigExtentionOptions>
>(ApiAppConfigSchema, {
  accountPort: { envVariable: 'ACCOUNT_PORT' },
  accountHost: { envVariable: 'ACCOUNT_HOST' },
  accountPath: { envVariable: 'ACCOUNT_PATH' },
  blogPort: { envVariable: 'BLOG_PORT' },
  blogHost: { envVariable: 'BLOG_HOST' },
  blogPath: { envVariable: 'BLOG_PATH' },
  fileStoragePort: { envVariable: 'FILE_STORAGE_PORT' },
  fileStorageHost: { envVariable: 'FILE_STORAGE_HOST' },
  fileStoragePath: { envVariable: 'FILE_STORAGE_PATH' },
  notificationPort: { envVariable: 'NOTIFICATION_PORT' },
  notificationHost: { envVariable: 'NOTIFICATION_HOST' },
  notificationPath: { envVariable: 'NOTIFICATION_PATH' },
});

export default registerConfig(ApiConfigNamespace.APP);

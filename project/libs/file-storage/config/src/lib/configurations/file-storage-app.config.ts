import {
  AppBaseConfig,
  AppBaseConfigSchema,
  createAppBaseConfig,
} from '@avylando/config';
import {
  FileStorageConfigErrorMessages,
  FileStorageConfigNamespace,
} from '../file-storage-config.constants';
import { IsString } from 'class-validator';
import { FileStorageAppConfig } from '../file-storage-config.interface';

class FileStorageAppConfigSchema extends AppBaseConfigSchema {
  @IsString({
    message: FileStorageConfigErrorMessages.uploadDirectory,
  })
  uploadDirectory: string;
}

const registerConfig = createAppBaseConfig<
  Omit<FileStorageAppConfig, keyof AppBaseConfig>
>(
  {
    uploadDirectory: 'UPLOAD_DIRECTORY',
  },
  FileStorageAppConfigSchema
);

export default registerConfig(FileStorageConfigNamespace.APP);

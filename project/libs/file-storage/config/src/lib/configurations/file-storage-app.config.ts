import { AppBaseConfigSchema, createAppBaseConfig } from '@avylando/config';
import {
  FileStorageConfigErrorMessages,
  FileStorageConfigNamespace,
} from '../file-storage-config.constants';
import { IsString } from 'class-validator';

type FileStorageAppConfig = {
  uploadDirectory: string;
};

class FileStorageAppConfigSchema extends AppBaseConfigSchema {
  @IsString({
    message: FileStorageConfigErrorMessages.uploadDirectory,
  })
  uploadDirectory: string;
}

async function bootstrap() {
  const registerConfig = await createAppBaseConfig<FileStorageAppConfig>(
    {
      uploadDirectory: process.env.UPLOAD_DIRECTORY,
    },
    FileStorageAppConfigSchema
  );

  return registerConfig(FileStorageConfigNamespace.APP);
}

export default bootstrap();

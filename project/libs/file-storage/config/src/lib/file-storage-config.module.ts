import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileStorageMongoConfig from './configurations/file-storage-mongo.config';
import fileStorageAppConfig from './configurations/file-storage-app.config';

type FileStorageConfig = ReturnType<Awaited<typeof fileStorageMongoConfig>>;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileStorageMongoConfig, fileStorageAppConfig],
      envFilePath: 'apps/file-storage/file-storage.env',
    }),
  ],
})
export class FileStorageConfigModule {}

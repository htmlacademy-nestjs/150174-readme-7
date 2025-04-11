import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileStorageMongoConfig from './configurations/file-storage-mongo.config';
import fileStorageAppConfig from './configurations/file-storage-app.config';
import fileStorageRabbitConfig from './configurations/file-storage-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        fileStorageMongoConfig,
        fileStorageAppConfig,
        fileStorageRabbitConfig,
      ],
      envFilePath: 'apps/file-storage/file-storage.env',
      expandVariables: true,
    }),
  ],
})
export class FileStorageConfigModule {}

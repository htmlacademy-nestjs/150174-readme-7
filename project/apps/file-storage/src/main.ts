/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { FileStorageConfigNamespace } from '@project/file-storage-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get(`${FileStorageConfigNamespace.APP}.port`);
  const globalPrefix = configService.get(
    `${FileStorageConfigNamespace.APP}.globalPrefix`
  );

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

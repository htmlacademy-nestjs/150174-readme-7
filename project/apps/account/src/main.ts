/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { AccountConfigNamespace } from '@project/account-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Account service')
    .setDescription('The Account service API for "Readme" project')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, documentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get(`${AccountConfigNamespace.APP}.port`);
  const globalPrefix = configService.get(
    `${AccountConfigNamespace.APP}.globalPrefix`
  );

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

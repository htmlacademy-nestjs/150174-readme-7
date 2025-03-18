/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { BlogConfigNamespace } from '@project/blog-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Blog service')
    .setDescription('The Blog service API for "Readme" project')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, documentFactory);

  const configService = app.get(ConfigService);
  const globalPrefix = configService.get(
    `${BlogConfigNamespace.APP}.globalPrefix`
  );
  const port = configService.get(`${BlogConfigNamespace.APP}.port`);

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

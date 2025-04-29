/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiConfigNamespace } from '@project/api-config';
import { ConfigService } from '@nestjs/config';
import { RequestIdInterceptor } from '@project/interceptors';
import { AxiosExceptionFilter } from './app/filters/axios-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const config = new DocumentBuilder()
    .setTitle('API-Gateway service')
    .setDescription('The API-Gateway service for "Readme" project')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter access token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'JWT'
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, documentFactory);

  const configService = app.get(ConfigService);
  const port = configService.get(`${ApiConfigNamespace.APP}.port`);
  const globalPrefix = configService.get(
    `${ApiConfigNamespace.APP}.globalPrefix`
  );

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new RequestIdInterceptor());
  app.useGlobalFilters(new AxiosExceptionFilter());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

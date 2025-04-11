import { Module } from '@nestjs/common';
import { ApiConfigModule, ApiConfigNamespace } from '@project/api-config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { UsersController } from './controllers/users.controller';
import { getRabbitMQOptions } from '@avylando/config';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.const';
import { ApiNotifyModule } from '@project/api-notify';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(ApiConfigNamespace.RABBIT)
    ),
    ApiConfigModule,
    ApiNotifyModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ApiConfigModule, ApiConfigNamespace } from '@project/api-config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@avylando/config';
import { HttpModule } from '@nestjs/axios';
import { ApiNotifyModule } from '@project/api-notify';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.const';
import { UsersController } from './controllers/users.controller';

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
  providers: [CheckAuthGuard],
})
export class AppModule {}

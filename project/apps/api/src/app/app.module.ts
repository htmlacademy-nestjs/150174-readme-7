import { Module } from '@nestjs/common';
import { ApiConfigModule, getApiRabbitMQOptions } from '@project/api-config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { HttpModule } from '@nestjs/axios';
import { ApiNotifyModule } from '@project/api-notify';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.const';
import { UsersController } from './controllers/users.controller';
import { BlogPostsController } from './controllers/blog-posts.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, getApiRabbitMQOptions()),
    ApiConfigModule,
    ApiNotifyModule,
  ],
  controllers: [UsersController, BlogPostsController],
  providers: [CheckAuthGuard],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ApiConfigModule, getApiRabbitMQOptions } from '@project/api-config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { APP_GUARD } from '@nestjs/core';

import { HttpModule } from '@nestjs/axios';
import { ApiNotifyModule } from '@project/api-notify';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.const';
import { UsersController } from './controllers/users.controller';
import { BlogPostsController } from './controllers/blog-posts.controller';
import { BlogPostService } from './services/blog-post.service';
import { BlogCommentsController } from './controllers/blog-comments.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    RabbitMQModule.forRootAsync(getApiRabbitMQOptions()),
    ApiConfigModule,
    ApiNotifyModule,
  ],
  controllers: [UsersController, BlogPostsController, BlogCommentsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CheckAuthGuard,
    },
    BlogPostService,
    UserService,
  ],
})
export class AppModule {}

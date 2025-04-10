import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import notificationMongoConfig from './configurations/notification-mongo.config';
import notificationAppConfig from './configurations/notification-app.config';
import notificationRabbitConfig from './configurations/notification-rabbit.config';
import notificationMailConfig from './configurations/notification-mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        notificationMongoConfig,
        notificationRabbitConfig,
        notificationAppConfig,
        notificationMailConfig,
      ],
      envFilePath: 'apps/notification/notification.env',
      expandVariables: true,
    }),
  ],
})
export class NotificationConfigModule {}

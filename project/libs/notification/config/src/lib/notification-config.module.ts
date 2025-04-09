import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import notificationMongoConfig from './configurations/notification-mongo.config';
import notificationAppConfig from './configurations/notification-app.config';
import notificationRabbitConfig from './configurations/notification-rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        notificationMongoConfig,
        notificationRabbitConfig,
        notificationAppConfig,
      ],
      envFilePath: 'apps/notification/notification.env',
      expandVariables: true,
    }),
  ],
})
export class NotificationConfigModule {}

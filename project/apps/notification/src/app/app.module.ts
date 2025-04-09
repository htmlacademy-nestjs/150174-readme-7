import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  getNotificationMongooseOptions,
  NotificationConfigModule,
} from '@project/notification-config';
@Module({
  imports: [
    NotificationConfigModule,
    MongooseModule.forRootAsync(getNotificationMongooseOptions()),
  ],
})
export class AppModule {}

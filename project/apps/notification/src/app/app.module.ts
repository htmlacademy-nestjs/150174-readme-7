import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  getNotificationMongooseOptions,
  NotificationConfigModule,
} from '@project/notification-config';
import { EmailSubscriberModule } from '@project/notification-email-subscriber';

@Module({
  imports: [
    NotificationConfigModule,
    EmailSubscriberModule,
    MongooseModule.forRootAsync(getNotificationMongooseOptions()),
  ],
})
export class AppModule {}

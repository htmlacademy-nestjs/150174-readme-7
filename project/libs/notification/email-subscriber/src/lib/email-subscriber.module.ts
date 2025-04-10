import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailSubscriberModel,
  EmailSubscriberSchema,
} from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberService } from './email-subscriber.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@avylando/config';
import { NotificationConfigNamespace } from '@project/notification-config';
import { NotificationMailerModule } from '@project/notification-mailer';
import { EmailSubscriberController } from './email-subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(NotificationConfigNamespace.RABBIT)
    ),
    NotificationMailerModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [
    EmailSubscriberRepository,
    EmailSubscriberFactory,
    EmailSubscriberService,
  ],
})
export class EmailSubscriberModule {}

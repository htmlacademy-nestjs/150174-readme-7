import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmailSubscriberModel,
  EmailSubscriberSchema,
} from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { EmailSubscriberService } from './email-subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema },
    ]),
  ],
  providers: [
    EmailSubscriberRepository,
    EmailSubscriberFactory,
    EmailSubscriberService,
  ],
  exports: [EmailSubscriberService],
})
export class EmailSubscriberModule {}

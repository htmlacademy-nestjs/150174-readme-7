import {
  BaseFactory,
  NotificationSubscriber,
  WithOptionalDbAttributes,
} from '@avylando-readme/core';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
class EmailSubscriberFactory extends BaseFactory<
  WithOptionalDbAttributes<NotificationSubscriber>,
  EmailSubscriberEntity
> {
  constructor() {
    super(EmailSubscriberEntity);
  }
}

export { EmailSubscriberFactory };

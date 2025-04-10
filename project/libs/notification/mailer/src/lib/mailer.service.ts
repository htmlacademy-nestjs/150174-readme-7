import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { NotificationSubscriber } from '@avylando-readme/core';
import { NotificationMailConfig } from '@project/notification-config';
import { ADD_SUBSCRIBER_SUBJECT } from './mailer.const';

@Injectable()
export class NotificationMailerService {
  constructor(
    @Inject(NotificationMailConfig.KEY)
    private readonly mailConfig: ConfigType<typeof NotificationMailConfig>,
    private readonly mailerService: MailerService
  ) {}

  public async sendMailNewSubscriber(subscriber: NotificationSubscriber) {
    await this.mailerService.sendMail({
      from: this.mailConfig.from,
      to: subscriber.email,
      subject: ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`,
      },
    });
  }
}

import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { NotificationMailerService } from '@project/notification-mailer';
import { RabbitMqRouting } from '@avylando-readme/core';

import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: NotificationMailerService
  ) {}

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitMqRouting.AddSubscriber,
    queue: process.env.RABBIT_QUEUE,
  })
  public async create(subscriber: CreateEmailSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendMailNewSubscriber(subscriber);
  }
}

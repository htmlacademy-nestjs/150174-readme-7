import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitMqRouting } from '@avylando-readme/core';
import { accountRabbitConfig } from '@project/account-config';

import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Injectable()
export class AccountNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(accountRabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof accountRabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitMqRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async deleteSubscriber(email: string) {
    return this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitMqRouting.DeleteSubscriber,
      email
    );
  }
}

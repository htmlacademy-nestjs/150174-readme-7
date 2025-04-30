import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { ApiRabbitConfig } from '@project/api-config';

@Injectable()
export class ApiNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(ApiRabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof ApiRabbitConfig>
  ) {}
}

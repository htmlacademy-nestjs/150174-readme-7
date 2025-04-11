import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { ApiConfigNamespace } from '@project/api-config';
import { getRabbitMQOptions } from '@avylando/config';
import { ApiNotifyService } from './api-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(ApiConfigNamespace.RABBIT)
    ),
  ],
  providers: [ApiNotifyService],
  exports: [ApiNotifyService],
})
export class ApiNotifyModule {}

import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getApiRabbitMQOptions } from '@project/api-config';
import { ApiNotifyService } from './api-notify.service';

@Module({
  imports: [RabbitMQModule.forRootAsync(getApiRabbitMQOptions())],
  providers: [ApiNotifyService],
  exports: [ApiNotifyService],
})
export class ApiNotifyModule {}

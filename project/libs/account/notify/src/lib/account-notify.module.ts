import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { AccountConfigNamespace } from '@project/account-config';
import { getRabbitMQOptions } from '@avylando/config';
import { AccountNotifyService } from './account-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      getRabbitMQOptions(AccountConfigNamespace.RABBIT)
    ),
  ],
  providers: [AccountNotifyService],
  exports: [AccountNotifyService],
})
export class AccountNotifyModule {}

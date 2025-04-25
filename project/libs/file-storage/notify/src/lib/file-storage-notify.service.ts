import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { FileStorageRabbitConfig } from '@project/file-storage-config';

@Injectable()
export class FileStorageNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(FileStorageRabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof FileStorageRabbitConfig>
  ) {}
}

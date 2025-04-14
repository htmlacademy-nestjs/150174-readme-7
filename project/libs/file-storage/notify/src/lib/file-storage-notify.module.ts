import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@avylando/config';
import {
  FileStorageConfigNamespace,
  getFileStorageRabbitMQOptions,
} from '@project/file-storage-config';
import { FileStorageNotifyService } from './file-storage-notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getFileStorageRabbitMQOptions()
    ),
  ],
  providers: [FileStorageNotifyService],
  exports: [FileStorageNotifyService],
})
export class FileStorageNotifyModule {}

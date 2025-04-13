import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitMqRouting } from '@avylando-readme/core';
import { FileStorageRabbitConfig } from '@project/file-storage-config';

import { NotifyAvatarUploadedDto } from './dto/notify-avatar-uploaded.dto';
import { NotifyPostMediaUploadedDto } from './dto/notify-post-media-uploaded.dto';

@Injectable()
export class FileStorageNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(FileStorageRabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof FileStorageRabbitConfig>
  ) {}

  public async notifyAvatarUploaded(dto: NotifyAvatarUploadedDto) {
    return this.rabbitClient.publish<NotifyAvatarUploadedDto>(
      this.rabbitOptions.exchange,
      RabbitMqRouting.NotifyAvatarUploaded,
      { ...dto }
    );
  }

  public async notifyPostImageUploaded(dto: NotifyPostMediaUploadedDto) {
    return this.rabbitClient.publish<NotifyPostMediaUploadedDto>(
      this.rabbitOptions.exchange,
      RabbitMqRouting.NotifyPostImageUploaded,
      { ...dto }
    );
  }

  public async notifyPostVideoUploaded(dto: NotifyPostMediaUploadedDto) {
    return this.rabbitClient.publish<NotifyPostMediaUploadedDto>(
      this.rabbitOptions.exchange,
      RabbitMqRouting.NotifyPostVideoUploaded,
      { ...dto }
    );
  }
}

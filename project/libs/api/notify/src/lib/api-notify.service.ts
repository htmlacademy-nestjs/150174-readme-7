import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitMqRouting } from '@avylando-readme/core';
import { ApiRabbitConfig } from '@project/api-config';

import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { UploadPostMediaDto } from './dto/upload-post-media.dto';

@Injectable()
export class ApiNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(ApiRabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof ApiRabbitConfig>
  ) {}

  public async uploadUserAvatar(dto: UploadAvatarDto) {
    return this.rabbitClient.publish<UploadAvatarDto>(
      this.rabbitOptions.exchange,
      RabbitMqRouting.UploadAvatar,
      { ...dto }
    );
  }

  public async uploadPostImage(dto: UploadPostMediaDto) {
    return this.rabbitClient.publish<UploadPostMediaDto>(
      this.rabbitOptions.exchange,
      RabbitMqRouting.UploadPostImage,
      { ...dto }
    );
  }

  public async uploadPostVideo(dto: UploadPostMediaDto) {
    return this.rabbitClient.publish<UploadPostMediaDto>(
      this.rabbitOptions.exchange,
      RabbitMqRouting.UploadPostVideo,
      { ...dto }
    );
  }
}

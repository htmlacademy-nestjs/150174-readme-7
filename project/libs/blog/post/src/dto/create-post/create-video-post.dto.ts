import { VideoPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
import { CreatePostValidationMessage } from '../dto-validations.const';

type Data = VideoPost['data'];
export class CreateVideoPostDto implements Data {
  @ApiProperty({
    description: 'Video source',
    type: 'string',
    example: '/videos/video.mp4',
  })
  @IsUrl({}, { message: CreatePostValidationMessage.videoSrc })
  @Expose()
  public videoSrc: Data['videoSrc'];

  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'Post title',
  })
  @IsString({ message: CreatePostValidationMessage.title })
  @Expose()
  public title: Data['title'];
}

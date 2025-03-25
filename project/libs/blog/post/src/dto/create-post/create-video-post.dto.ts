import { VideoPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

type Data = VideoPost['data'];
export class CreateVideoPostDto implements Data {
  @ApiProperty({
    description: 'Video source',
    type: 'string',
    example: '/videos/video.mp4',
  })
  @Expose()
  public videoSrc: Data['videoSrc'];

  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'Post title',
  })
  @Expose()
  public title: Data['title'];
}

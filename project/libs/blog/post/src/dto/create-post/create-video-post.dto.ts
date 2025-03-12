import { BasePost, VideoPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateVideoPostDto implements Omit<VideoPost, keyof BasePost> {
  @ApiProperty({
    description: 'Video source',
    type: 'string',
    example: '/videos/video.mp4',
  })
  @Expose()
  public videoSrc: VideoPost['videoSrc'];

  @ApiProperty({
    description: 'Post name',
    type: 'string',
    example: 'Post name',
  })
  @Expose()
  public name: VideoPost['name'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'video',
  })
  @Expose()
  public kind: VideoPost['kind'];
}

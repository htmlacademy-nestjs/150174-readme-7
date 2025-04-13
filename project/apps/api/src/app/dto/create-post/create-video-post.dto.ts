import { VideoPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

type Data = VideoPost['data'];
export class CreateVideoPostDto implements Omit<Data, 'videoSrc'> {
  @ApiProperty({
    description: 'Post video',
    type: 'string',
    format: 'binary',
  })
  @Expose()
  public video: Express.Multer.File;

  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'Post title',
  })
  @IsString({ message: 'Post title must be a string' })
  @Expose()
  public title: Data['title'];
}

import { VideoPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl, Length } from 'class-validator';
import { VideoPostValidation } from '../dto-validations.const';

type Data = VideoPost['data'];
export class CreateVideoPostDto implements Data {
  @ApiProperty({
    description: 'Video source',
    type: 'string',
    example: 'https://www.videos.com/videos/video.mp4',
  })
  @IsUrl({}, { message: VideoPostValidation.videoSrc.validType.message })
  @Expose()
  public videoSrc: Data['videoSrc'];

  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'Post title',
  })
  @IsString({ message: VideoPostValidation.title.validType.message })
  @Length(
    VideoPostValidation.title.length.min,
    VideoPostValidation.title.length.max,
    {
      message: VideoPostValidation.title.length.message,
    }
  )
  @Expose()
  public title: Data['title'];
}

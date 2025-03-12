import { BasePost, ImagePost } from '@avylando-readme/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImagePostDto implements Omit<ImagePost, keyof BasePost> {
  @ApiProperty({
    description: 'Image source',
    type: 'string',
    example: '/images/image.jpg',
  })
  @Expose()
  public imageSrc: ImagePost['imageSrc'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'image',
  })
  @Expose()
  public kind: ImagePost['kind'];
}

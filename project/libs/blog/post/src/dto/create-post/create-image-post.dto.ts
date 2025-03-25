import { ImagePost } from '@avylando-readme/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

type Data = ImagePost['data'];
export class CreateImagePostDto implements Data {
  @ApiProperty({
    description: 'Image source',
    type: 'string',
    example: '/images/image.jpg',
  })
  @Expose()
  public imageSrc: Data['imageSrc'];
}

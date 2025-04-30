import { ImagePost } from '@avylando-readme/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { ImagePostValidation } from '../dto-validations.const';

type Data = ImagePost['data'];
export class CreateImagePostDto implements Data {
  @ApiProperty({
    description: 'Image source',
    type: 'string',
    example: '/images/image.jpg',
  })
  @IsUrl(ImagePostValidation.imageSrc.urlOptions, {
    message: ImagePostValidation.imageSrc.validType.message,
  })
  @Expose()
  public imageSrc: Data['imageSrc'];
}

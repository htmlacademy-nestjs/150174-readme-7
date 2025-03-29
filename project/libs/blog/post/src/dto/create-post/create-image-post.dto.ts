import { ImagePost } from '@avylando-readme/core';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { CreatePostValidationMessage } from '../dto-validations.const';

type Data = ImagePost['data'];
export class CreateImagePostDto implements Data {
  @ApiProperty({
    description: 'Image source',
    type: 'string',
    example: '/images/image.jpg',
  })
  @IsUrl({}, { message: CreatePostValidationMessage.imageSrc })
  @Expose()
  public imageSrc: Data['imageSrc'];
}

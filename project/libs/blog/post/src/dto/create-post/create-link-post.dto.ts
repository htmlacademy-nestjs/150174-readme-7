import { LinkPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
import { CreatePostValidationMessage } from '../dto-validations.const';

type Data = LinkPost['data'];
export class CreateLinkPostDto implements Data {
  @ApiProperty({
    description: 'Link URL',
    type: 'string',
    example: 'https://avylando.com',
  })
  @IsUrl({}, { message: CreatePostValidationMessage.link })
  @Expose()
  public link: Data['link'];

  @ApiProperty({
    description: 'Link description',
    type: 'string',
    example: 'Avylando website',
  })
  @IsString({ message: CreatePostValidationMessage.description })
  @Expose()
  public description: Data['description'];
}

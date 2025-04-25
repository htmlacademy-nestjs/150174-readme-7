import { LinkPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl, MaxLength } from 'class-validator';
import { LinkPostValidation } from '../dto-validations.const';

type Data = LinkPost['data'];
export class CreateLinkPostDto implements Data {
  @ApiProperty({
    description: 'Link URL',
    type: 'string',
    example: 'https://avylando.com',
  })
  @IsUrl({}, { message: LinkPostValidation.link.validType.message })
  @Expose()
  public link: Data['link'];

  @ApiProperty({
    description: 'Link description',
    type: 'string',
    example: 'Avylando website',
  })
  @IsString({ message: LinkPostValidation.description.validType.message })
  @MaxLength(LinkPostValidation.description.length.max, {
    message: LinkPostValidation.description.length.message,
  })
  @Expose()
  public description: Data['description'];
}

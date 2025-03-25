import { LinkPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

type Data = LinkPost['data'];
export class CreateLinkPostDto implements Data {
  @ApiProperty({
    description: 'Link URL',
    type: 'string',
    example: 'https://avylando.com',
  })
  @Expose()
  public link: Data['link'];

  @ApiProperty({
    description: 'Link description',
    type: 'string',
    example: 'Avylando website',
  })
  @Expose()
  public description: Data['description'];
}

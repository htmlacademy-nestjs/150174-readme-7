import { BasePost, LinkPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateLinkPostDto implements Omit<LinkPost, keyof BasePost> {
  @ApiProperty({
    description: 'Link URL',
    type: 'string',
    example: 'https://avylando.com',
  })
  @Expose()
  public link: LinkPost['link'];

  @ApiProperty({
    description: 'Link description',
    type: 'string',
    example: 'Avylando website',
  })
  @Expose()
  public description: LinkPost['description'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'link',
  })
  @Expose()
  public kind: LinkPost['kind'];
}

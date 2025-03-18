import { BasePost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateBasePostDto implements Omit<BasePost, 'id'> {
  @ApiProperty({
    description: 'Post author ID',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Post status',
    type: 'string',
    example: 'published',
  })
  @Expose()
  public status: BasePost['status'];

  @ApiProperty({
    description: 'Post tags',
    type: 'array',
    items: {
      type: 'string',
    },
    example: ['tag1', 'tag2'],
  })
  @Expose()
  public tags?: BasePost['tags'];
}

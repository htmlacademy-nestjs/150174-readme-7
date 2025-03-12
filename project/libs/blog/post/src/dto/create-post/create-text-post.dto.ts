import { BasePost, TextPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTextPostDto implements Omit<TextPost, keyof BasePost> {
  @ApiProperty({
    description: 'Post name',
    type: 'string',
    example: 'Post name',
  })
  @Expose()
  public name: TextPost['name'];

  @ApiProperty({
    description: 'Post content',
    type: 'string',
    example: 'Post content',
  })
  @Expose()
  public content: TextPost['content'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'text',
  })
  @Expose()
  public kind: TextPost['kind'];

  @ApiProperty({
    description: 'Post content preview',
    type: 'string',
    example: 'Post preview...',
  })
  @Expose()
  public preview: TextPost['preview'];
}

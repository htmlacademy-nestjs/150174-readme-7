import { Comment } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class CreateCommentDto implements Pick<Comment, 'authorId' | 'content'> {
  @ApiProperty({
    description: 'Comment author ID',
    type: 'string',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @Expose()
  public authorId: Comment['authorId'];

  @ApiProperty({
    description: 'Comment content',
    type: 'string',
    example: 'Comment content',
  })
  @Expose()
  public content: Comment['content'];
}

export { CreateCommentDto };

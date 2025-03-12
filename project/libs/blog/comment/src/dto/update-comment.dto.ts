import { Comment } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class UpdateCommentDto implements Pick<Comment, 'content'> {
  @ApiProperty({
    description: 'Comment content',
    type: 'string',
    example: 'Comment content',
  })
  @Expose()
  public content: Comment['content'];
}

export { UpdateCommentDto };

import { Comment } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

class CreateCommentDto implements Pick<Comment, 'content'> {
  @ApiProperty({
    description: 'Comment content',
    type: 'string',
    example: 'Comment content',
  })
  @IsString({ message: 'Content must be a string' })
  @Expose()
  public content: Comment['content'];
}

export { CreateCommentDto };

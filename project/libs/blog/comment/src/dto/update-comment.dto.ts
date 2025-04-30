import { Comment } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { CommentValidation } from './dto-validations.const';

class UpdateCommentDto implements Pick<Comment, 'content'> {
  @ApiProperty({
    description: 'Comment content',
    type: 'string',
    example: 'Comment content',
  })
  @IsString({ message: CommentValidation.content.validType.message })
  @Length(
    CommentValidation.content.length.min,
    CommentValidation.content.length.max,
    { message: CommentValidation.content.length.message }
  )
  @Expose()
  public content: Comment['content'];
}

export { UpdateCommentDto };

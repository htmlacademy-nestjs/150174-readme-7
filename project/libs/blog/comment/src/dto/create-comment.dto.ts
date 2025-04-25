import { Comment } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsString, Length } from 'class-validator';
import { CommentValidation } from './dto-validations.const';

class CreateCommentDto implements Pick<Comment, 'authorId' | 'content'> {
  @ApiProperty({
    description: 'Comment author ID',
    type: 'string',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @IsMongoId({ message: CommentValidation.authorId.validType.message })
  @Expose()
  public authorId: Comment['authorId'];

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

export { CreateCommentDto };

import { TextPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { TextPostValidation } from '../dto-validations.const';

type Data = TextPost['data'];
export class CreateTextPostDto implements Data {
  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'Post title',
  })
  @IsString({ message: TextPostValidation.title.validType.message })
  @Length(
    TextPostValidation.title.length.min,
    TextPostValidation.title.length.max,
    {
      message: TextPostValidation.title.length.message,
    }
  )
  @Expose()
  public title: Data['title'];

  @ApiProperty({
    description: 'Post content',
    type: 'string',
    example: 'Post content',
  })
  @IsString({ message: TextPostValidation.content.validType.message })
  @Length(
    TextPostValidation.content.length.min,
    TextPostValidation.content.length.max,
    {
      message: TextPostValidation.content.length.message,
    }
  )
  @Expose()
  public content: Data['content'];

  @ApiProperty({
    description: 'Post content preview',
    type: 'string',
    example: 'Post preview...',
  })
  @IsString({ message: TextPostValidation.preview.validType.message })
  @Length(
    TextPostValidation.preview.length.min,
    TextPostValidation.preview.length.max,
    {
      message: TextPostValidation.preview.length.message,
    }
  )
  @Expose()
  public preview: Data['preview'];
}

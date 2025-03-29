import { TextPost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { CreatePostValidationMessage } from '../dto-validations.const';

type Data = TextPost['data'];
export class CreateTextPostDto implements Data {
  @ApiProperty({
    description: 'Post title',
    type: 'string',
    example: 'Post title',
  })
  @IsString({ message: CreatePostValidationMessage.title })
  @Expose()
  public title: Data['title'];

  @ApiProperty({
    description: 'Post content',
    type: 'string',
    example: 'Post content',
  })
  @IsString({ message: CreatePostValidationMessage.content })
  @Expose()
  public content: Data['content'];

  @ApiProperty({
    description: 'Post content preview',
    type: 'string',
    example: 'Post preview...',
  })
  @IsString({ message: CreatePostValidationMessage.preview })
  @Expose()
  public preview: Data['preview'];
}

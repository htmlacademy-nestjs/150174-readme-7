import { BasePost, PostKind } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsString,
} from 'class-validator';
import { CreatePostValidationMessage } from '../dto-validations.const';

export class CreateBasePostDto implements Omit<BasePost, 'id' | 'data'> {
  @ApiProperty({
    description: 'Post author ID',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @IsMongoId({ message: CreatePostValidationMessage.authorId })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Post status',
    type: 'string',
    example: 'published',
  })
  @IsEnum(['published', 'draft'], {
    message: CreatePostValidationMessage.status,
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
  @IsArray({
    message: CreatePostValidationMessage.tags,
  })
  @IsString({ each: true, message: CreatePostValidationMessage.tags })
  @Expose()
  public tags?: BasePost['tags'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'text',
  })
  @IsEnum(PostKind, {
    message: CreatePostValidationMessage.kind,
  })
  @Expose()
  public kind: BasePost['kind'];

  @ApiProperty({
    description: 'Repost flag',
    type: 'boolean',
    example: true,
  })
  @IsBoolean({ message: CreatePostValidationMessage.repost })
  @Expose()
  public repost: boolean;
}

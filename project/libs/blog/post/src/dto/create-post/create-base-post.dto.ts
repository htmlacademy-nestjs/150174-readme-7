import { BasePost, cleanTags, PostKind } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BasePostValidation } from '../dto-validations.const';

export class CreateBasePostDto implements Omit<BasePost, 'id' | 'data'> {
  @ApiProperty({
    description: 'Post author ID',
    type: 'string',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @IsMongoId({ message: BasePostValidation.authorId.validType.message })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Post status',
    type: 'string',
    example: 'published',
  })
  @IsEnum(['published', 'draft'], {
    message: BasePostValidation.status.enum.message,
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
  @ArrayMaxSize(BasePostValidation.tags.size.max, {
    message: BasePostValidation.tags.size.message,
  })
  @IsArray({
    message: BasePostValidation.tags.validType.message,
  })
  @Length(
    BasePostValidation.tags.length.min,
    BasePostValidation.tags.length.max,
    { message: BasePostValidation.tags.length.message, each: true }
  )
  @IsString({ each: true, message: BasePostValidation.tags.validType.message })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return cleanTags(value);
    }
    if (typeof value === 'string') {
      return cleanTags(value.split(','));
    }
    return value;
  })
  @Expose()
  public tags?: BasePost['tags'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'text',
  })
  @IsEnum(PostKind, {
    message: BasePostValidation.kind.enum.message,
  })
  @Expose()
  public kind: BasePost['kind'];
}

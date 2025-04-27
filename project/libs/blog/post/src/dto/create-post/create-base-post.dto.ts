import { BasePost, PostKind } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { BasePostValidation } from '../dto-validations.const';

export class CreateBasePostDto implements Omit<BasePost, 'id' | 'data'> {
  @ApiProperty({
    description: 'Post author ID',
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
  @IsArray({
    message: BasePostValidation.tags.validType.message,
  })
  @IsString({ each: true, message: BasePostValidation.tags.validType.message })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((tag) => tag.trim());
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

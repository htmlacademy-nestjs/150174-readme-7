import { BasePost, PostKind } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBasePostDto
  implements Omit<BasePost, 'id' | 'data' | 'authorId'>
{
  @ApiProperty({
    description: 'Post status',
    type: 'string',
    example: 'published',
  })
  @IsEnum(['published', 'draft'], {
    message: 'Post status must be either published or draft',
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
    message: 'Post tags must be an array of strings',
  })
  @IsString({ each: true, message: 'Post tags must be an array of strings' })
  @IsOptional()
  @Expose()
  public tags?: BasePost['tags'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'text',
  })
  @IsEnum(PostKind, {
    message: 'Post kind must be one of the predefined kinds',
  })
  @Expose()
  public kind: BasePost['kind'];

  @ApiProperty({
    description: 'Post image',
    type: 'string',
    format: 'binary',
  })
  @Expose()
  public image?: Express.Multer.File;

  @ApiProperty({
    description: 'Post video',
    type: 'string',
    format: 'binary',
  })
  @Expose()
  public video?: Express.Multer.File;

  @ApiProperty({
    description: 'Repost flag',
    type: 'boolean',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Repost flag must be a boolean' })
  @Expose()
  public repost?: boolean;
}

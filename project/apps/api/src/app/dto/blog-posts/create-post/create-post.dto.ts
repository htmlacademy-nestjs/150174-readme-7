import 'multer';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Transform, Type, TypeHelpOptions } from 'class-transformer';
import {
  BasePostValidation,
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from '@project/blog-post';
import { CreateImageWithFilePostDto } from './create-image-with-file-post.dto';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { BasePost, cleanTags, Post, PostKind } from '@avylando-readme/core';

@ApiExtraModels(
  CreateImageWithFilePostDto,
  CreateLinkPostDto,
  CreateTextPostDto,
  CreateQuotePostDto,
  CreateVideoPostDto
)
export class CreatePostDto implements Omit<BasePost, 'authorId'> {
  @ApiProperty({
    description: 'Post status',
    type: 'string',
    example: 'published',
  })
  @IsEnum(['published', 'draft'], {
    message: BasePostValidation.status.enum.message,
  })
  @Expose()
  public status: Post['status'];

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
  public tags?: Post['tags'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'text',
  })
  @IsEnum(PostKind, {
    message: BasePostValidation.kind.enum.message,
  })
  @Expose()
  public kind: Post['kind'];

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(CreateImageWithFilePostDto) },
      { $ref: getSchemaPath(CreateLinkPostDto) },
      { $ref: getSchemaPath(CreateTextPostDto) },
      { $ref: getSchemaPath(CreateQuotePostDto) },
      { $ref: getSchemaPath(CreateVideoPostDto) },
    ],
  })
  @ValidateNested()
  @Type((opts: TypeHelpOptions) => {
    const kind = opts.object['kind'] as Post['kind'];
    switch (kind) {
      case 'text':
        return CreateTextPostDto;
      case 'link':
        return CreateLinkPostDto;
      case 'quote':
        return CreateQuotePostDto;
      case 'video':
        return CreateVideoPostDto;
      case 'image':
        return undefined;
      default:
        throw new Error(`Unknown post kind: ${kind}`);
    }
  })
  @Expose()
  public data:
    | CreateImageWithFilePostDto
    | CreateLinkPostDto
    | CreateTextPostDto
    | CreateQuotePostDto
    | CreateVideoPostDto;

  @ApiProperty({
    description: 'Image file',
    type: 'string',
    format: 'binary',
  })
  @Expose()
  public image?: CreateImageWithFilePostDto['image'];
}

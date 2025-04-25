import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type, TypeHelpOptions } from 'class-transformer';
import {
  BasePostValidation,
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from '@project/blog-post';
import { CreateImageWithFilePostDto } from './create-post/create-image-with-file-post.dto';
import { IsEnum, ValidateNested } from 'class-validator';
import { Post, PostKind } from '@avylando-readme/core';

@ApiExtraModels(
  CreateImageWithFilePostDto,
  CreateLinkPostDto,
  CreateTextPostDto,
  CreateQuotePostDto,
  CreateVideoPostDto
)
export class UpdatePostDto {
  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'text',
  })
  @IsEnum(PostKind, {
    message: BasePostValidation.kind.enum.message,
  })
  @Expose()
  public kind: PostKind;

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
        return CreateImageWithFilePostDto;
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
}

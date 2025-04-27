import 'multer';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Transform, Type, TypeHelpOptions } from 'class-transformer';
import {
  CreateBasePostDto,
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from '@project/blog-post';
import { CreateImageWithFilePostDto } from './create-image-with-file-post.dto';
import { ValidateNested } from 'class-validator';
import { Post } from '@avylando-readme/core';

@ApiExtraModels(
  CreateImageWithFilePostDto,
  CreateLinkPostDto,
  CreateTextPostDto,
  CreateQuotePostDto,
  CreateVideoPostDto
)
export class CreatePostDto extends CreateBasePostDto {
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
  @Transform(({ value }) => JSON.parse(value))
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

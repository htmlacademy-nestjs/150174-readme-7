import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type, TypeHelpOptions } from 'class-transformer';
import { CreateBasePostDto } from './create-base-post.dto';
import { CreateImagePostDto } from './create-image-post.dto';
import { CreateLinkPostDto } from './create-link-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';
import { Post } from '@avylando-readme/core';
import { ValidateNested } from 'class-validator';

@ApiExtraModels(
  CreateImagePostDto,
  CreateLinkPostDto,
  CreateTextPostDto,
  CreateQuotePostDto,
  CreateVideoPostDto
)
export class CreatePostDto extends CreateBasePostDto {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(CreateImagePostDto) },
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
        return CreateImagePostDto;
      default:
        throw new Error(`Unknown post kind: ${kind}`);
    }
  })
  @Expose()
  public data:
    | CreateImagePostDto
    | CreateLinkPostDto
    | CreateTextPostDto
    | CreateQuotePostDto
    | CreateVideoPostDto;
}

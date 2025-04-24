import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateBasePostDto } from './create-base-post.dto';
import {
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from '@project/blog-post';
import { CreateImageWithFilePostDto } from './create-image-with-file-post.dto';

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
  @Expose()
  public data:
    | CreateImageWithFilePostDto
    | CreateLinkPostDto
    | CreateTextPostDto
    | CreateQuotePostDto
    | CreateVideoPostDto;
}

import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateBasePostDto } from './create-base-post.dto';
import {
  CreateLinkPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateImagePostDto,
  CreateVideoPostDto,
} from '@project/blog-post';

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
  @Expose()
  public data:
    | CreateImagePostDto
    | CreateLinkPostDto
    | CreateTextPostDto
    | CreateQuotePostDto
    | CreateVideoPostDto;
}

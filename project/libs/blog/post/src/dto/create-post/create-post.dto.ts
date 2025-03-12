import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CreateBasePostDto } from './create-base-post.dto';
import { CreateImagePostDto } from './create-image-post.dto';
import { CreateLinkPostDto } from './create-link-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';

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

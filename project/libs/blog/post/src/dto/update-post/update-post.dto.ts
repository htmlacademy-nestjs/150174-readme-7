import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CreateImagePostDto } from '../create-post/create-image-post.dto';
import { CreateLinkPostDto } from '../create-post/create-link-post.dto';
import { CreateTextPostDto } from '../create-post/create-text-post.dto';
import { CreateQuotePostDto } from '../create-post/create-quote-post.dto';
import { CreateVideoPostDto } from '../create-post/create-video-post.dto';

export class UpdatePostDto {
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

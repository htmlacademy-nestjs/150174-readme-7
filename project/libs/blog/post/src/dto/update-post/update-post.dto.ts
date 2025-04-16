import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { CreateImagePostDto } from '../create-post/create-image-post.dto';
import { CreateLinkPostDto } from '../create-post/create-link-post.dto';
import { CreateTextPostDto } from '../create-post/create-text-post.dto';
import { CreateQuotePostDto } from '../create-post/create-quote-post.dto';
import { CreateVideoPostDto } from '../create-post/create-video-post.dto';
import { IsMongoId } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Post author ID',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @IsMongoId({ message: 'Invalid author ID' })
  @Expose()
  public authorId: string;

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

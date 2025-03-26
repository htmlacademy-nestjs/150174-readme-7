import { QuotePost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { CreatePostValidationMessage } from '../dto-validations.const';

type Data = QuotePost['data'];
export class CreateQuotePostDto implements Data {
  @ApiProperty({
    description: 'Quote text',
    type: 'string',
    example: 'To be or not to be',
  })
  @IsString({ message: CreatePostValidationMessage.quote })
  @Expose()
  public quote: Data['quote'];

  @ApiProperty({
    description: 'Quote author ID',
    type: 'string',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @IsMongoId({ message: CreatePostValidationMessage.quoteAuthorId })
  @Expose()
  public quoteAuthorId: Data['quoteAuthorId'];
}

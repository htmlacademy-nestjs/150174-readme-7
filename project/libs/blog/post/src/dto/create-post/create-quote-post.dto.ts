import { QuotePost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { QuotePostValidation } from '../dto-validations.const';

type Data = QuotePost['data'];
export class CreateQuotePostDto implements Data {
  @ApiProperty({
    description: 'Quote text',
    type: 'string',
    example: 'To be or not to be',
  })
  @IsString({ message: QuotePostValidation.quote.validType.message })
  @MinLength(QuotePostValidation.quote.length.min, {
    message: QuotePostValidation.quote.length.message,
  })
  @MaxLength(QuotePostValidation.quote.length.max, {
    message: QuotePostValidation.quote.length.message,
  })
  @Expose()
  public quote: Data['quote'];

  @ApiProperty({
    description: 'Quote author name',
    type: 'string',
    example: 'William Shakespeare',
  })
  @IsString({ message: QuotePostValidation.authorName.validType.message })
  @MinLength(QuotePostValidation.authorName.length.min, {
    message: QuotePostValidation.authorName.length.message,
  })
  @MaxLength(QuotePostValidation.authorName.length.max, {
    message: QuotePostValidation.authorName.length.message,
  })
  @Expose()
  public authorName: Data['authorName'];
}

import { QuotePost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

type Data = QuotePost['data'];
export class CreateQuotePostDto implements Data {
  @ApiProperty({
    description: 'Quote text',
    type: 'string',
    example: 'To be or not to be',
  })
  @Expose()
  public quote: Data['quote'];

  @ApiProperty({
    description: 'Quote author ID',
    type: 'string',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @Expose()
  public quoteAuthorId: Data['quoteAuthorId'];
}

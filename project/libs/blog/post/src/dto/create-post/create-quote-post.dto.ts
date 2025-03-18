import { BasePost, QuotePost } from '@avylando-readme/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateQuotePostDto implements Omit<QuotePost, keyof BasePost> {
  @ApiProperty({
    description: 'Quote text',
    type: 'string',
    example: 'To be or not to be',
  })
  @Expose()
  public quote: QuotePost['quote'];

  @ApiProperty({
    description: 'Quote author ID',
    type: 'string',
    example: '60f5b2b3c4e9d2b9c8b2c8b2c',
  })
  @Expose()
  public quoteAuthorId: QuotePost['quoteAuthorId'];

  @ApiProperty({
    description: 'Post kind',
    type: 'string',
    example: 'quote',
  })
  @Expose()
  public kind: QuotePost['kind'];
}

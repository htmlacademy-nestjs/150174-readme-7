import { QuotePost } from '@avylando-readme/core';
import { CreateBasePostDto } from './create-base-post.dto';

export class CreateQuotePostDto
  extends CreateBasePostDto
  implements Omit<QuotePost, 'id'>
{
  public quote: QuotePost['quote'];
  public quoteAuthorId: QuotePost['quoteAuthorId'];
  public kind: QuotePost['kind'];
}

import { QuotePost, WithOptionalId } from '@avylando-readme/core';
import { BasePostEntity } from './base-post.entity';

class QuotePostEntity extends BasePostEntity<QuotePost> {
  public kind!: QuotePost['kind'];
  public quoteAuthorId!: QuotePost['quoteAuthorId'];
  public quote!: QuotePost['quote'];

  constructor(post: WithOptionalId<QuotePost>) {
    super(post);
    this.populate(post);
  }

  private populate(post: WithOptionalId<QuotePost>) {
    this.quoteAuthorId = post.quoteAuthorId;
    this.quote = post.quote;
    this.kind = post.kind;
  }

  public override toPlainObject(): QuotePost {
    return {
      ...this.toBasePlainObject(),
      quoteAuthorId: this.quoteAuthorId,
      quote: this.quote,
      kind: this.kind,
    };
  }
}

export { QuotePostEntity };

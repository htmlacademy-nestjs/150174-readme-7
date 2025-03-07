import { QuotePost, WithOptionalId } from '@avylando-readme/core';
import { BasePostEntity } from './base-post.entity';

class QuotePostEntity extends BasePostEntity<QuotePost> {
  public kind!: QuotePost['kind'];
  public quoteAuthorId!: QuotePost['quoteAuthorId'];
  public content!: QuotePost['content'];

  constructor(post: WithOptionalId<QuotePost>) {
    super(post);
    this.populate(post);
  }

  private populate(post: WithOptionalId<QuotePost>) {
    this.quoteAuthorId = post.quoteAuthorId;
    this.content = post.content;
    this.kind = post.kind;
  }

  public override toPlainObject(): QuotePost {
    return {
      ...this.toBasePlainObject(),
      quoteAuthorId: this.quoteAuthorId,
      content: this.content,
      kind: this.kind,
    };
  }
}

export { QuotePostEntity };

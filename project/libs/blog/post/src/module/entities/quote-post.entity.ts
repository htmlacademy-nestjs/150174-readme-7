import { QuotePost } from '@avylando-readme/core';
import { BasePostEntity } from './base-post.entity';

class QuotePostEntity extends BasePostEntity<QuotePost> {
  public kind!: QuotePost['kind'];
  public quoteAuthorId!: QuotePost['quoteAuthorId'];
  public content!: QuotePost['content'];

  constructor(post: QuotePost) {
    super(post);
    this.populate(post);
  }

  private populate(post: QuotePost) {
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

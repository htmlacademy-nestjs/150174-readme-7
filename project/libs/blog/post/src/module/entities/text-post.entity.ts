import { BasePostEntity } from './base-post.entity';
import { TextPost } from '@avylando-readme/core';

class TextPostEntity extends BasePostEntity<TextPost> {
  public kind!: TextPost['kind'];
  public name!: TextPost['name'];
  public content!: TextPost['content'];
  public preview!: TextPost['preview'];

  constructor(post: TextPost) {
    super(post);
    this.populate(post);
  }

  private populate(post: TextPost) {
    this.kind = post.kind;
    this.name = post.name;
    this.content = post.content;
    this.preview = post.preview;
  }

  public override toPlainObject(): TextPost {
    return {
      ...this.toBasePlainObject(),
      kind: this.kind,
      name: this.name,
      content: this.content,
      preview: this.preview,
    };
  }
}

export { TextPostEntity };

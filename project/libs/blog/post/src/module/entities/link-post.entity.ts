import { LinkPost } from '@avylando-readme/core';
import { BasePostEntity } from './base-post.entity';

class LinkPostEntity extends BasePostEntity<LinkPost> {
  public kind!: 'link';
  public link!: LinkPost['link'];
  public description: LinkPost['description'];

  constructor(post: LinkPost) {
    super(post);
    this.populate(post);
  }

  private populate(post: LinkPost) {
    this.kind = post.kind;
    this.link = post.link;
    this.description = post.description;
  }

  public override toPlainObject(): LinkPost {
    return {
      ...this.toBasePlainObject(),
      kind: this.kind,
      link: this.link,
      description: this.description,
    };
  }
}

export { LinkPostEntity };

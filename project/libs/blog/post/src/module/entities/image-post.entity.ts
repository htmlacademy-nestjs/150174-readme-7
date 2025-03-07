import { ImagePost } from '@avylando-readme/core';
import { BasePostEntity } from './base-post.entity';

class ImagePostEntity extends BasePostEntity<ImagePost> {
  public kind!: ImagePost['kind'];
  public imageSrc!: ImagePost['imageSrc'];

  constructor(post: ImagePost) {
    super(post);
    this.populate(post);
  }

  private populate(post: ImagePost) {
    this.kind = post.kind;
    this.imageSrc = post.imageSrc;
  }

  public override toPlainObject(): ImagePost {
    return {
      ...this.toBasePlainObject(),
      kind: this.kind,
      imageSrc: this.imageSrc,
    };
  }
}

export { ImagePostEntity };

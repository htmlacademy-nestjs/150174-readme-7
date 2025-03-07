import { VideoPost } from '@avylando-readme/core';
import { BasePostEntity } from './base-post.entity';

class VideoPostEntity extends BasePostEntity<VideoPost> {
  public kind!: VideoPost['kind'];
  public videoSrc!: VideoPost['videoSrc'];

  constructor(post: VideoPost) {
    super(post);
    this.populate(post);
  }

  private populate(post: VideoPost) {
    this.kind = post.kind;
    this.videoSrc = post.videoSrc;
  }

  public override toPlainObject(): VideoPost {
    return {
      ...this.toBasePlainObject(),
      kind: this.kind,
      videoSrc: this.videoSrc,
    };
  }
}

export { VideoPostEntity };

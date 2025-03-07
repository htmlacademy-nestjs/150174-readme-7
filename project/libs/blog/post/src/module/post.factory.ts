import {
  EntityFactory,
  ImagePost,
  LinkPost,
  QuotePost,
  TextPost,
  VideoPost,
} from '@avylando-readme/core';
import { LinkPostEntity } from './entities/link-post.entity';
import { VideoPostEntity } from './entities/video-post.entity';
import { TextPostEntity } from './entities/text-post.entity';
import { QuotePostEntity } from './entities/quote-post.entity';
import { ImagePostEntity } from './entities/image-post.entity';
import { PostEntity } from './entities/post.entity';

class PostFactory implements EntityFactory<PostEntity> {
  public create(
    post: LinkPost | ImagePost | QuotePost | TextPost | VideoPost
  ): PostEntity {
    switch (post.kind) {
      case 'link':
        return new LinkPostEntity(post);
      case 'image':
        return new ImagePostEntity(post);
      case 'quote':
        return new QuotePostEntity(post);
      case 'text':
        return new TextPostEntity(post);
      case 'video':
        return new VideoPostEntity(post);
      default:
        throw new Error(`Unknown post kind`);
    }
  }
}

export { PostFactory };

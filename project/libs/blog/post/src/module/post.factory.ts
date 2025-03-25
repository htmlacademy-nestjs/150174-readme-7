import { EntityFactory, Post, WithOptionalId } from '@avylando-readme/core';
import { BlogPostEntity } from './post.entity';

class PostFactory implements EntityFactory<BlogPostEntity> {
  public create(post: WithOptionalId<Post>): BlogPostEntity {
    switch (post.kind) {
      case 'link':
      case 'image':
      case 'quote':
      case 'text':
      case 'video':
        return new BlogPostEntity(post);
      default:
        throw new Error(`Unknown post kind`);
    }
  }
}

export { PostFactory };

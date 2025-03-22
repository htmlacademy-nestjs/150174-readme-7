// Entity
export { Entity } from './lib/classes/entity';

export { StorableEntity } from './lib/interfaces/base/storable-entity.interface';
export { EntityFactory } from './lib/interfaces/base/entity-factory.interface';

// User
export { UserRole } from './lib/interfaces/user/user-role.type';
export { User } from './lib/interfaces/user/user.interface';

// Comment
export { Comment } from './lib/interfaces/comment/comment.interface';

// Post
export { PostStatus } from './lib/interfaces/post/post-status.type';
export { Tag } from './lib/interfaces/post/tag.type';
export { BasePost } from './lib/interfaces/post/base-post.interface';
export { QuotePost } from './lib/interfaces/post/quote-post.interface';
export { LinkPost } from './lib/interfaces/post/link-post.interface';
export { ImagePost } from './lib/interfaces/post/image-post.interface';
export { VideoPost } from './lib/interfaces/post/video-post.interface';
export { TextPost } from './lib/interfaces/post/text-post.interface';
export { Post } from './lib/interfaces/post/post.type';

// Repository
export { Repository } from './lib/classes/repository/repository.interface';
export { MemoryRepository } from './lib/classes/repository/memory-repository';
export { MongoRepository } from './lib/classes/repository/mongo-repository';
export { PostgresRepository } from './lib/classes/repository/postgres-repository';

// Helpers
export { fillDto } from './lib/helpers/dto.helpers';

// Utility types
export type {
  WithOptionalId,
  WithOptionalIdDistributive,
} from './lib/types/with-optional-id.type';

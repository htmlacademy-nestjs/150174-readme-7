// Entity
export { Entity } from './lib/classes/entity';
export { BaseEntity } from './lib/interfaces/base/base-entity.interface';
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
export { PostKind } from './lib/interfaces/post/post-kind.enum';
export { BasePost } from './lib/interfaces/post/base-post.interface';
export { QuotePost } from './lib/interfaces/post/kinds/quote-post.interface';
export { LinkPost } from './lib/interfaces/post/kinds/link-post.interface';
export { ImagePost } from './lib/interfaces/post/kinds/image-post.interface';
export { VideoPost } from './lib/interfaces/post/kinds/video-post.interface';
export { TextPost } from './lib/interfaces/post/kinds/text-post.interface';
export { Post, PostData } from './lib/interfaces/post/post.type';

// File
export { File } from './lib/interfaces/file/file.interface';
export { StoredFile } from './lib/interfaces/file/stored-file.interface';

// Factory
export { BaseFactory } from './lib/classes/base-factory';

// Repository
export { Repository } from './lib/classes/repository/repository.interface';
export { MemoryRepository } from './lib/classes/repository/memory-repository';
export { MongoRepository } from './lib/classes/repository/mongo-repository';
export { PostgresRepository } from './lib/classes/repository/postgres-repository';

// Auth
export { JwtTokenPayload } from './lib/interfaces/auth/jwt-payload.interface';
export { JwtToken } from './lib/interfaces/auth/jwt-token.interface';

// Query
export { PaginationResult } from './lib/interfaces/query/pagination-result.interface';
export { SortDirection } from './lib/interfaces/query/sort-direction.enum';
export { PostSortBy } from './lib/interfaces/query/sort-by.enum';

// Notification
export { RabbitMqRouting } from './lib/interfaces/notification/rabbit-routing.enum';
export { NotificationSubscriber } from './lib/interfaces/notification/subscriber.interface';

// Schema
export { ConfigSchema } from './lib/classes/config-schema';

// Helpers
export { fillDto } from './lib/helpers/dto.helpers';
export { formatSchemaValidationErrors } from './lib/helpers/schema.helpers';

// Utility types
export type {
  WithOptionalId,
  WithOptionalIdDistributive,
} from './lib/types/with-optional-id.type';
export type { PlainObject } from './lib/types/plain-object.type';
export type { UnionToIntersection } from './lib/types/union-to-intersection.type';
export type { WithOptionalDbAttributes } from './lib/types/with-optional-db-attributes.type';

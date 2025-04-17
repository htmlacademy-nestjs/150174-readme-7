import { Tag } from './tag.type';
import { BaseEntity } from '../base/base-entity.interface';
import { User } from '../user/user.interface';
import { PostStatus } from './post-status.type';
import { PostKind } from './post-kind.enum';
import { PlainObject } from '../../types/plain-object.type';
import { Comment } from '../comment/comment.interface';
import { WithOptionalDbAttributes } from '../../types/with-optional-db-attributes.type';
import { WithRequiredId } from '../../types/with-required-id.type';

type BasePost<
  Kind extends PostKind = PostKind,
  Data extends PlainObject = {}
> = WithOptionalDbAttributes<{
  authorId: WithRequiredId<User>['id'];
  status: PostStatus;
  repost?: boolean;
  tags?: Tag[];
  kind: Kind;
  data: Data;
  comments?: Comment[];
  likesCount?: number;
}>;

export type { BasePost };

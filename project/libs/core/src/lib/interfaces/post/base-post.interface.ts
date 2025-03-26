import { Tag } from './tag.type';
import { BaseEntity } from '../base/base-entity.interface';
import { User } from '../user/user.interface';
import { PostStatus } from './post-status.type';
import { PostKind } from './post-kind.enum';
import { PlainObject } from '../../types/plain-object.type';

type BasePost<
  Kind extends PostKind = PostKind,
  Data extends PlainObject = {}
> = BaseEntity & {
  authorId: User['id'];
  status: PostStatus;
  repost: boolean;
  tags?: Tag[];
  kind: Kind;
  data: Data;
};

export type { BasePost };

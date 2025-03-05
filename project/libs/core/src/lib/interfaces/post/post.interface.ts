import { BaseEntity } from '../base/base-entity.interface';
import { Comment } from '../comment/comment.interface';

interface Post extends BaseEntity {
  title: string;
  content: string;
  comments: Comment[];
}

export type { Post };

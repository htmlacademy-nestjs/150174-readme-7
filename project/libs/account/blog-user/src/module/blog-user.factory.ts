import {
  BaseFactory,
  User,
  WithOptionalDbAttributes,
} from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';

class BlogUserFactory extends BaseFactory<
  WithOptionalDbAttributes<User>,
  BlogUserEntity
> {
  constructor() {
    super(BlogUserEntity);
  }
}

export { BlogUserFactory };

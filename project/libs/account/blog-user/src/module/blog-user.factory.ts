import { BaseFactory, User } from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';

class BlogUserFactory extends BaseFactory<User, BlogUserEntity> {
  constructor() {
    super(BlogUserEntity);
  }
}

export { BlogUserFactory };

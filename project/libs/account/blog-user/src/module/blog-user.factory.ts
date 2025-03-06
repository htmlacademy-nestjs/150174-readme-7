import { EntityFactory, User } from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';

class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  public create(entityPlainData: User): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}

export { BlogUserFactory };

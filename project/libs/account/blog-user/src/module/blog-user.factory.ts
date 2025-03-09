import { EntityFactory, User, WithOptionalId } from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';

class BlogUserFactory implements EntityFactory<BlogUserEntity> {
  public create(
    entityPlainData: Omit<WithOptionalId<User>, 'passwordHash'>
  ): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}

export { BlogUserFactory };

import { MemoryRepository } from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
class BlogUserRepository extends MemoryRepository<BlogUserEntity> {
  constructor(entityFactory: BlogUserFactory) {
    super(entityFactory);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const user = this.entitiesArray.find((u) => u.email === email);
    if (!user) {
      return null;
    }
    return this.entityFactory.create(user);
  }
}

export { BlogUserRepository };

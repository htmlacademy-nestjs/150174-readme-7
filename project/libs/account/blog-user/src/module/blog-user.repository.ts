import { MemoryRepository } from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
class BlogUserRepository extends MemoryRepository<BlogUserEntity> {
  constructor(entityFactory: BlogUserFactory) {
    super(entityFactory);
  }
}

export { BlogUserRepository };

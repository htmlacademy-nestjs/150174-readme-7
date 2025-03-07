import { MemoryRepository } from '@avylando-readme/core';
import { PostEntity } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { PostFactory } from './post.factory';

@Injectable()
class PostRepository extends MemoryRepository<PostEntity> {
  constructor(entityFactory: PostFactory) {
    super(entityFactory);
  }
}

export { PostRepository };

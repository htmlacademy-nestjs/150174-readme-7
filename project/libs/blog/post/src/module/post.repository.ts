import { PostgresRepository } from '@avylando-readme/core';
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { PostFactory } from './post.factory';
import { PostEntity } from './entities/post.entity';

@Injectable()
class PostRepository extends PostgresRepository<PostEntity> {
  constructor(entityFactory: PostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }
}

export { PostRepository };

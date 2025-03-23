import {
  Post,
  PostgresRepository,
  WithOptionalId,
} from '@avylando-readme/core';
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { PostFactory } from './post.factory';
import { PostEntity } from './entities/post.entity';

@Injectable()
class PostRepository extends PostgresRepository<PostEntity> {
  constructor(entityFactory: PostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const post = await this.client.post.create({
      data: entity.toPlainObject(),
    });
    console.log(post);
    return this.createEntityFromDocument(post as Post);
  }

  public async findById(id: string): Promise<PostEntity> {
    const post = await this.client.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }

    return this.createEntityFromDocument(post as Post);
  }

  public async update(entity: PostEntity): Promise<PostEntity> {
    const updatedEntity = await this.client.post.update({
      where: {
        id: entity.id,
      },
      data: entity.toPlainObject(),
    });

    return this.createEntityFromDocument(updatedEntity as Post);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }
}

export { PostRepository };

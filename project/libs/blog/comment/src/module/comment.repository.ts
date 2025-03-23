import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { PostgresRepository } from '@avylando-readme/core';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';

@Injectable()
class CommentRepository extends PostgresRepository<CommentEntity> {
  constructor(entityFactory: CommentFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const comment = await this.client.comment.create({
      data: entity,
    });
    return this.createEntityFromDocument(comment);
  }

  async findById(id: string): Promise<CommentEntity> {
    const comment = await this.client.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return this.createEntityFromDocument(comment);
  }

  public async update(entity: CommentEntity): Promise<CommentEntity> {
    const updatedEntity = await this.client.comment.update({
      where: {
        id: entity.id,
      },
      data: entity.toPlainObject(),
    });

    return this.createEntityFromDocument(updatedEntity);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    const comments = await this.client.comment.findMany({
      where: {
        postId,
      },
    });
    return comments.map((comment) => this.createEntityFromDocument(comment));
  }
}

export { CommentRepository };

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
    const { postId, ...data } = entity.toPlainObject();
    const comment = await this.client.comment
      .create({
        data: {
          ...data,
          post: {
            connect: {
              id: postId,
            },
          },
        },
      })
      .catch((error) => {
        throw new NotFoundException(`Post with id ${postId} not found`);
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
    try {
      const { postId, ...data } = entity.toPlainObject();
      const updatedEntity = await this.client.comment.update({
        where: {
          id: entity.id,
        },
        data: {
          ...data,
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });

      return this.createEntityFromDocument(updatedEntity);
    } catch (error) {
      throw new NotFoundException(`Comment with id ${entity.id} not found`);
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      await this.client.comment.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
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

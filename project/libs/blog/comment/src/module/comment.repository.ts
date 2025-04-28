import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { PostgresRepository } from '@avylando-readme/core';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentQuery } from '../query/comment-query.dto';
import { Prisma } from '@prisma/client';

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
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async getCommentsByPostId(
    postId: string,
    query: CommentQuery
  ): Promise<CommentEntity[]> {
    const comments = await this.client.comment.findMany({
      ...this.getQueryOptions(postId, query),
    });
    return comments.map((comment) => this.createEntityFromDocument(comment));
  }

  private getQueryOptions(
    postId: string,
    query: CommentQuery
  ): Prisma.CommentFindManyArgs {
    const { limit, page } = query;

    const where: Prisma.CommentWhereInput = {
      postId,
    };

    return {
      take: limit,
      skip: (page - 1) * limit,
      where,
    };
  }
}

export { CommentRepository };

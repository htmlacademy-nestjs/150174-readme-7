import {
  Post,
  PostgresRepository,
  WithOptionalId,
} from '@avylando-readme/core';
import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { PostFactory } from './post.factory';
import { BlogPostEntity } from './post.entity';

@Injectable()
class PostRepository extends PostgresRepository<BlogPostEntity> {
  constructor(entityFactory: PostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, ...commonPostData } = entity.toPlainObject();
    const raw = await this.client.post.create({
      relationLoadStrategy: 'join',
      data: {
        ...commonPostData,
        data: {
          connect: {
            id: entity.id,
            [entity.kind]: {
              create: data,
            },
          },
        },
      },
      include: {
        data: {
          select: {
            [entity.kind]: true,
          },
        },
      },
    });

    const post = this.extractPostData(raw);

    return this.createEntityFromDocument(post);
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const raw = await this.client.post.findUnique({
      relationLoadStrategy: 'join',

      where: {
        id,
      },
      include: {
        data: {
          select: {
            link: true,
            image: true,
            quote: true,
            text: true,
            video: true,
          },
        },
      },
    });

    if (!raw) {
      throw new Error(`Post with id ${id} not found`);
    }
    const post = this.extractPostData(raw);
    return this.createEntityFromDocument(post);
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, ...commonPostData } = entity.toPlainObject();

    const updatedEntity = await this.client.post.update({
      where: {
        id: entity.id,
      },
      data: {
        ...commonPostData,
        data: {
          update: {
            [entity.kind]: {
              update: data,
            },
          },
        },
      },
      include: {
        data: {
          select: {
            [entity.kind]: true,
          },
        },
      },
    });

    const post = this.extractPostData(updatedEntity);

    return this.createEntityFromDocument(post);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  private extractPostData(
    rawData: Omit<Post, 'data'> & { data: Record<string, unknown> }
  ): Post {
    const { data: relatedData, ...rest } = rawData;
    const kindData = relatedData[rest.kind] as Post['data'];
    return { ...rest, data: kindData } as Post;
  }
}

export { PostRepository };

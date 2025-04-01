import {
  Post,
  PostgresRepository,
  PlainObject,
  PaginationResult,
} from '@avylando-readme/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { PostFactory } from './post.factory';
import { BlogPostEntity } from './post.entity';
import { Prisma } from '@prisma/client';
import { PostQuery } from './post.query';

type RawData = Omit<Post, 'data' | 'tags'> & {
  data: PlainObject;
  tags: { name: string }[];
};

@Injectable()
class PostRepository extends PostgresRepository<BlogPostEntity> {
  constructor(entityFactory: PostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, comments, tags, ...commonPostData } = entity.toPlainObject();
    const raw = await this.client.post.create({
      relationLoadStrategy: 'join',
      data: {
        ...commonPostData,
        data: {
          create: {
            [entity.kind]: {
              create: data,
            },
          },
        },
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
      include: {
        data: {
          select: {
            [entity.kind]: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const post = this.extractPostData(raw as RawData);

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
        tags: {
          select: {
            name: true,
          },
        },
        comments: true,
      },
    });

    if (!raw) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const post = this.extractPostData(raw as RawData);
    return this.createEntityFromDocument(post);
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, tags, comments, ...commonPostData } = entity.toPlainObject();

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
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
      include: {
        data: {
          select: {
            [entity.kind]: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const post = this.extractPostData(updatedEntity as RawData);
    return this.createEntityFromDocument(post);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findMany(
    query: PostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const { limit, page, sortDirection, tags, authorId } = query;

    const where: Prisma.PostWhereInput = {};

    if (tags) {
      where.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    if (authorId) {
      where.authorId = authorId;
    }

    const [posts, totalItems] = await Promise.all([
      this.client.post.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          createdAt: sortDirection,
        },
        where,
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
          tags: {
            select: {
              name: true,
            },
          },
          comments: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: posts.map((post) =>
        this.createEntityFromDocument(this.extractPostData(post as RawData))
      ),
      totalItems,
      totalPages: this.calculatePostsPage(totalItems, limit),
      currentPage: page,
      itemsPerPage: limit,
    };
  }

  private extractPostData(rawData: RawData): Post {
    const { data: relatedData, tags, ...rest } = rawData;
    const kindData = relatedData[rest.kind] as Post['data'];
    return { ...rest, data: kindData, tags: tags.map((el) => el.name) } as Post;
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }
}

export { PostRepository };

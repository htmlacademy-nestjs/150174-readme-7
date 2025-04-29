import {
  Post,
  PostgresRepository,
  PlainObject,
  PaginationResult,
  PostSortBy,
  PostStatus,
} from '@avylando-readme/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';
import { $Enums, Prisma } from '@prisma/client';

import { PostFactory } from './post.factory';
import { BlogPostEntity } from './post.entity';
import { PostQuery } from '../query/post-query.dto';
import { PostSearchQuery } from '../query/post-search-query.dto';

type PostOptionalIncludes = Extract<
  keyof Prisma.PostInclude,
  'comments' | 'likes'
>;

type PrismaPostRawData = Omit<Post, 'data' | 'tags' | 'kind'> & {
  data: PlainObject;
  kind: $Enums.PostKind;
  tags: { name: string }[];
  _count?: {
    likes: number;
  };
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
      include: this.prepareInclude(),
    });

    const post = this.adaptRawDataToPost(raw);

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
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!raw) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const post = this.adaptRawDataToPost(raw);
    return this.createEntityFromDocument(post);
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, tags, comments, likesCount, ...commonPostData } =
      entity.toPlainObject();

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
          } as Prisma.PostToKindSelect,
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const post = this.adaptRawDataToPost(updatedEntity);
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
    const options = this.getQueryOptions(query);
    const result = await this.getPaginationResult(options, query, {
      comments: true,
      likes: true,
    });
    return result;
  }

  public async findDrafts(
    userId: string,
    query: PostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const options = this.getQueryOptions(query, 'draft');
    options.where = {
      ...options.where,
      authorId: userId,
    };
    const result = await this.getPaginationResult(options, query);
    return result;
  }

  public async findBySearch(
    query: PostSearchQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const options = this.getSearchOptions(query);
    const result = await this.getPaginationResult(options, query);
    return result;
  }

  public async addPostToFavorites(
    postId: string,
    userId: string
  ): Promise<BlogPostEntity> {
    const result = await this.client.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          create: {
            userId: userId,
          },
        },
      },
      include: this.prepareInclude({ likes: true }),
    });

    const post = this.adaptRawDataToPost(result);
    return this.createEntityFromDocument(post);
  }

  public async removePostFromFavorites(
    postId: string,
    userId: string
  ): Promise<BlogPostEntity> {
    const result = await this.client.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          deleteMany: {
            userId,
          },
        },
      },
      include: this.prepareInclude({ likes: true }),
    });

    const post = this.adaptRawDataToPost(result);
    return this.createEntityFromDocument(post);
  }

  // Feed subscription methods
  public async subscribeToAuthor(
    userId: string,
    authorId: string
  ): Promise<void> {
    await this.client.feedSubscription.create({
      data: {
        subscriberId: userId,
        subscriptionId: authorId,
      },
    });
  }

  public async unsubscribeFromAuthor(
    userId: string,
    authorId: string
  ): Promise<void> {
    await this.client.feedSubscription.deleteMany({
      where: {
        subscriberId: userId,
        subscriptionId: authorId,
      },
    });
  }

  public async getSubscriptions(userId: string): Promise<string[]> {
    const result = await this.client.feedSubscription.findMany({
      where: {
        subscriberId: userId,
      },
      select: {
        subscriptionId: true,
      },
    });
    return result.map((el) => el.subscriptionId);
  }

  public async getUserFeed(
    userId: string,
    query: PostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const subscriptions = await this.getSubscriptions(userId);
    const options = this.getQueryOptions(query);
    options.where = {
      ...options.where,
      authorId: {
        in: subscriptions,
      },
    };
    const result = await this.getPaginationResult(options, query);
    return result;
  }

  private async getPaginationResult(
    options: Prisma.PostFindManyArgs,
    { limit, page }: Pick<PostQuery, 'limit' | 'page'>,
    includes: Partial<Record<PostOptionalIncludes, true>> = {}
  ): Promise<PaginationResult<BlogPostEntity>> {
    const [posts, totalItems] = await Promise.all([
      this.client.post.findMany({
        ...options,
        include: this.prepareInclude(includes),
      }),
      this.getPostCount(options.where as Prisma.PostWhereInput),
    ]);

    return {
      entities: posts.map((post) =>
        this.createEntityFromDocument(this.adaptRawDataToPost(post))
      ),
      totalItems,
      totalPages: this.calculatePostsPage(totalItems, limit),
      currentPage: page,
      itemsPerPage: limit,
    };
  }

  // This method is used to prepare the include object for Prisma queries
  private prepareInclude(
    includes: Partial<Record<PostOptionalIncludes, true>> = {}
  ): Prisma.PostInclude {
    const include: Prisma.PostInclude = {
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
    };

    if (includes.comments) {
      include.comments = true;
    }

    if (includes.likes) {
      include._count = {
        select: {
          likes: true,
        },
      };
    }
    return include;
  }

  private adaptRawDataToPost(rawData: PrismaPostRawData): Post {
    const { data: relatedData, tags, kind, _count, ...rest } = rawData;
    const kindData = relatedData[kind];
    return {
      ...rest,
      kind,
      data: kindData,
      tags: tags.map((el) => el.name),
      likesCount: _count?.likes,
    } as Post;
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  private getSearchOptions({
    title,
    ...rest
  }: PostSearchQuery): Prisma.PostFindManyArgs {
    const options = this.getQueryOptions(rest);
    options.where = {
      ...options.where,
      OR: [
        {
          data: {
            video: {
              title: {
                contains: title,
                mode: 'insensitive',
              },
            },
          },
        },
        {
          data: {
            text: {
              title: {
                contains: title,
                mode: 'insensitive',
              },
            },
          },
        },
      ],
    };
    return options;
  }

  private getQueryOptions(
    query: PostQuery,
    status: PostStatus = 'published'
  ): Prisma.PostFindManyArgs {
    const { limit, page, sortDirection, sortBy, tags, authorId } = query;

    const where: Prisma.PostWhereInput = {
      status,
    };

    if (status === 'draft') {
      where.authorId = authorId;
    }

    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (sortBy === PostSortBy.CreatedAt) {
      orderBy.createdAt = sortDirection;
    } else if (sortBy === PostSortBy.CommentsCount) {
      orderBy.comments = {
        _count: sortDirection,
      };
    } else if (sortBy === PostSortBy.LikesCount) {
      orderBy.likes = {
        _count: sortDirection,
      };
    }

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

    return {
      take: limit,
      skip: (page - 1) * limit,
      where,
      orderBy,
    };
  }
}

export { PostRepository };

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto, PaginationResult } from '@avylando-readme/core';
import { PostRdo } from '../rdo/post.rdo';
import { PostQuery } from '../query/post-query.dto';
import { LikePostDto } from '../dto/like-post-dto/like-post.dto';
import { UpdatePostDto } from '../dto/update-post/update-post.dto';
import {
  BLOG_POSTS_CONTROLLER_NAME,
  BlogPostsEndpoint,
} from './post.constants';
import { PostSearchQuery } from '../query/post-search-query.dto';
import { FeedSubscribeDto } from '../dto/subscribe/subscribe.dto';
import { ValidateMongoIdPipe } from '@project/pipes';

@ApiTags('posts', 'blog')
@Controller(BLOG_POSTS_CONTROLLER_NAME)
class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Get posts' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Posts not found',
  })
  @Get(BlogPostsEndpoint.POSTS)
  public async getPosts(
    @Query() query: PostQuery
  ): Promise<PaginationResult<PostRdo>> {
    const result = await this.postService.getPosts(query);
    return {
      ...result,
      entities: result.entities.map((post) =>
        fillDto(PostRdo, post.toPlainObject())
      ),
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get posts by user search',
  })
  @Get(BlogPostsEndpoint.SEARCH)
  public async getPostsBySearch(
    @Query() query: PostSearchQuery
  ): Promise<PaginationResult<PostRdo>> {
    const result = await this.postService.searchPosts(query);
    return {
      ...result,
      entities: result.entities.map((post) =>
        fillDto(PostRdo, post.toPlainObject())
      ),
    };
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user drafts',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Request forbidden',
  })
  @Get(BlogPostsEndpoint.DRAFTS)
  public async getDrafts(
    @Query() query: PostQuery
  ): Promise<PaginationResult<PostRdo>> {
    if (!query.authorId) {
      throw new ForbiddenException();
    }
    const result = await this.postService.getDraftPosts(query.authorId, query);
    return {
      ...result,
      entities: result.entities.map((post) =>
        fillDto(PostRdo, post.toPlainObject())
      ),
    };
  }

  @ApiConsumes('application/json')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create post' })
  @Post(BlogPostsEndpoint.POSTS)
  public async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postService.createPost(post);
    return fillDto(PostRdo, newPost.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find post' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Get(BlogPostsEndpoint.POST)
  public async findPost(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findPost(id);
    return fillDto(PostRdo, post.toPlainObject());
  }

  @ApiConsumes('application/json')
  @ApiResponse({ status: HttpStatus.OK, description: 'Update post' })
  @Put(BlogPostsEndpoint.POST)
  public async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() post: UpdatePostDto
  ) {
    const updatedPost = await this.postService.updatePost(id, post);
    return fillDto(PostRdo, updatedPost.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Delete post' })
  @Delete(BlogPostsEndpoint.POST)
  public async deletePost(@Param('id', ParseUUIDPipe) id: string) {
    await this.postService.deletePost(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post added to favorites',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Post(BlogPostsEndpoint.LIKE_POST)
  public async addPostToFavorites(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: LikePostDto
  ) {
    const post = await this.postService.addPostToFavorites(id, dto.userId);
    return fillDto(PostRdo, post.toPlainObject());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post removed from favorites',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found',
  })
  @Delete(BlogPostsEndpoint.LIKE_POST)
  public async removePostFromFavorites(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: LikePostDto
  ) {
    const post = await this.postService.removePostFromFavorites(id, dto.userId);
    return fillDto(PostRdo, post.toPlainObject());
  }

  // Feed
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Subscribed to author posts',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(BlogPostsEndpoint.SUBSCRIBE)
  public async subscribeToAuthor(
    @Param('authorId', ValidateMongoIdPipe) authorId: string,
    @Body() dto: FeedSubscribeDto
  ) {
    await this.postService.subscribeToAuthor(dto.userId, authorId);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Unsubscribed from author posts',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(BlogPostsEndpoint.SUBSCRIBE)
  public async unsubscribeFromAuthor(
    @Param('authorId', ValidateMongoIdPipe) authorId: string,
    @Body() dto: FeedSubscribeDto
  ) {
    await this.postService.unsubscribeFromAuthor(dto.userId, authorId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get user feed',
  })
  @Get(BlogPostsEndpoint.FEED)
  public async getFeed(
    @Query() query: PostQuery
  ): Promise<PaginationResult<PostRdo>> {
    if (!query.authorId) {
      throw new ForbiddenException();
    }
    const result = await this.postService.getUserFeed(query.authorId, query);
    return {
      ...result,
      entities: result.entities.map((post) =>
        fillDto(PostRdo, post.toPlainObject())
      ),
    };
  }
}

export { PostController };

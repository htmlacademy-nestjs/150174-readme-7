import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto, PaginationResult } from '@avylando-readme/core';
import { PostRdo } from '../rdo/post.rdo';
import { PostQuery } from './post.query';
import { ValidateMongoIdPipe } from '@project/pipes';
import { LikePostDto } from '../dto/like-post-dto/like-post.dto';

@ApiTags('posts', 'blog')
@Controller('posts')
class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'Get posts' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Posts not found' })
  @Get('/')
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

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create post' })
  @Post('/')
  public async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postService.createPost(post);
    return fillDto(PostRdo, newPost.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find post' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  @Get('/:id')
  public async findPost(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findPost(id);
    return fillDto(PostRdo, post.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update post' })
  @Put('/:id')
  public async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() post: CreatePostDto
  ) {
    const updatedPost = await this.postService.updatePost(id, post);
    return fillDto(PostRdo, updatedPost.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Delete post' })
  @Delete('/:id')
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
  @Post('/:id/favorites')
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
  @Delete('/:id/favorites')
  public async removePostFromFavorites(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: LikePostDto
  ) {
    const post = await this.postService.removePostFromFavorites(id, dto.userId);
    return fillDto(PostRdo, post.toPlainObject());
  }
}

export { PostController };

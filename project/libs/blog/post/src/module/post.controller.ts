import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@avylando-readme/core';
import { PostRdo } from '../rdo/post.rdo';

@ApiTags('posts', 'blog')
@Controller('posts')
class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create post' })
  @Post('/')
  public async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postService.createPost(post);
    return fillDto(PostRdo, newPost.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find post' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  @Get('/:id')
  public async findPost(@Param('id') id: string) {
    const post = await this.postService.findPost(id);
    return fillDto(PostRdo, post.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update post' })
  @Put('/:id')
  public async updatePost(
    @Param('id') id: string,
    @Body() post: CreatePostDto
  ) {
    const updatedPost = await this.postService.updatePost(id, post);
    return fillDto(PostRdo, updatedPost.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Delete post' })
  @Delete('/:id')
  public async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}

export { PostController };

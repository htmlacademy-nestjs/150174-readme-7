import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post/create-post.type';

@Controller('post')
class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  public async createPost(@Body() post: CreatePostDto) {
    const newPost = await this.postService.createPost(post);
    return newPost.toPlainObject();
  }

  @Get('/:id')
  public async findPost(@Param('id') id: string) {
    const post = await this.postService.findPost(id);
    return post.toPlainObject();
  }

  @Put('/:id')
  public async updatePost(
    @Param('id') id: string,
    @Body() post: CreatePostDto
  ) {
    const updatedPost = await this.postService.updatePost(id, post);
    return updatedPost.toPlainObject();
  }

  @Delete('/:id')
  public async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}

export { PostController };

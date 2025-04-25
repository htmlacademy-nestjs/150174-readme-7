import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { buildURI, PaginationResult } from '@avylando-readme/core';
import { HttpService } from '@nestjs/axios';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import {
  UpdatePostDto as LibUpdatePostDto,
  CreatePostDto as LibCreatePostDto,
  PostRdo,
  PostQuery,
  BLOG_POSTS_CONTROLLER_NAME,
  BlogPostsEndpoint,
} from '@project/blog-post';
import { join } from 'node:path';
import { RequestWithTokenPayload } from '@avylando-readme/core';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BlogPostService } from '../services/blog-post.service';
import { UpdatePostDto } from '../dto/update-post/update-post.dto';
import { ValidatePostImagePipe } from '../pipes/validate-post-image.pipe';
import { Public } from '../decorators/public.decorator';
import { ParseFormDataJsonPipe } from '@project/pipes';

@ApiTags('blog', 'posts')
@Controller('blog/posts')
class BlogPostsController {
  private readonly logger = new Logger(BlogPostsController.name);

  private getPostsServicePath() {
    return join(this.services.blogServiceUri, BLOG_POSTS_CONTROLLER_NAME);
  }

  private getShowPostsPath(query?: PostQuery) {
    return buildURI(join(this.getPostsServicePath(), BlogPostsEndpoint.POSTS), {
      query: { ...query },
    });
  }

  private getPostPath(postId: string) {
    return buildURI(join(this.getPostsServicePath(), BlogPostsEndpoint.POST), {
      pathParams: { id: postId },
    });
  }

  private getPostLikePath(postId) {
    return buildURI(
      join(this.getPostsServicePath(), BlogPostsEndpoint.LIKE_POST),
      { pathParams: { id: postId } }
    );
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig,
    private readonly blogPostService: BlogPostService
  ) {}

  @Public()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get posts' })
  @Get('/')
  public async getPosts(
    @Query() query: PostQuery
  ): Promise<PaginationResult<PostRdo>> {
    const { data } = await this.httpService.axiosRef.get<
      PaginationResult<PostRdo>
    >(this.getShowPostsPath(query), {});

    return data;
  }

  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create post' })
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiBearerAuth()
  @Post('/')
  public async createPost(
    @Req() { user }: RequestWithTokenPayload,
    @Body(new ParseFormDataJsonPipe({ except: ['image'] }))
    dto: CreatePostDto,
    @UploadedFiles(ValidatePostImagePipe)
    files: {
      image?: Express.Multer.File[];
    }
  ) {
    console.log(dto);
    const postData = await this.blogPostService.handlePostAssets(dto, files);
    const libDto: LibCreatePostDto = {
      ...postData,
      authorId: user.sub,
    };
    try {
      const { data } = await this.httpService.axiosRef.post<PostRdo>(
        this.getShowPostsPath(),
        libDto
      );
      this.logger.log(`Post created: ${data.id}`);
      return data;
    } catch (error) {
      this.logger.error(`Error creating post: ${error.message}`);
      throw error;
    }
  }

  @Public()
  @ApiResponse({ status: HttpStatus.OK, description: 'Find post' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  @Get('/:id')
  public async findPost(@Param('id', ParseUUIDPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get<PostRdo>(
      this.getPostPath(id)
    );

    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update post' })
  @Put('/:id')
  public async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: UpdatePostDto
  ) {
    const existingPost = await this.findPost(id);
    if (existingPost.authorId !== user.sub) {
      throw new ForbiddenException('You are not the author of this post');
    }

    const libDto: LibUpdatePostDto = {
      ...dto,
      authorId: user.sub,
    };

    const { data } = await this.httpService.axiosRef.put<PostRdo>(
      this.getPostPath(id),
      libDto
    );
    this.logger.log(`Post updated: ${data.id}`);
    return data;
  }

  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Delete post' })
  @Delete('/:id')
  public async deletePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: RequestWithTokenPayload
  ) {
    const existingPost = await this.findPost(id);
    if (existingPost.authorId !== user.sub) {
      throw new ForbiddenException('You are not the author of this post');
    }
    await this.httpService.axiosRef.delete(this.getPostPath(id));
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
    @Req() { user }: RequestWithTokenPayload
  ) {
    const { data } = await this.httpService.axiosRef.post<PostRdo>(
      this.getPostLikePath(id),
      { userId: user.sub }
    );

    return data;
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
    @Req() { user }: RequestWithTokenPayload
  ) {
    const { data } = await this.httpService.axiosRef.delete<PostRdo>(
      this.getPostLikePath(id),
      { data: { userId: user.sub } }
    );

    return data;
  }
}

export { BlogPostsController };

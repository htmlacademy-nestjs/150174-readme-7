import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  buildURI,
  PaginationResult,
  RabbitMqRouting,
} from '@avylando-readme/core';
import { HttpService } from '@nestjs/axios';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import { ApiNotifyService } from '@project/api-notify';
import {
  UpdatePostDto,
  PostRdo,
  PostQuery,
  BLOG_POSTS_CONTROLLER_NAME,
  BlogPostsEndpoint,
} from '@project/blog-post';
import { join } from 'node:path';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { RequestWithTokenPayload } from '@project/authentication';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { NotifyPostMediaUploadedDto } from 'libs/file-storage/notify/src/lib/dto/notify-post-media-uploaded.dto';

@ApiTags('blog')
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
    private readonly notifyService: ApiNotifyService
  ) {}

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

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ])
  )
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Create post' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT')
  @Post('/')
  public async createPost(
    @Req() { user }: RequestWithTokenPayload,
    @Body() post: CreatePostDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    }
  ) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const { image, video } = files;
    const postImage = image?.[0];
    const postVideo = video?.[0];
    if (
      (post.kind === 'image' && !postImage) ||
      (post.kind === 'video' && !postVideo)
    ) {
      throw new BadRequestException();
    }

    const { data } = await this.httpService.axiosRef.post<PostRdo>(
      this.getShowPostsPath(),
      { ...post, authorId: user.sub }
    );

    if (postImage) {
      await this.notifyService.uploadPostImage({
        postId: data.id,
        file: postImage,
      });
    }

    if (postVideo) {
      await this.notifyService.uploadPostVideo({
        postId: data.id,
        file: postVideo,
      });
    }

    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Find post' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Post not found' })
  @Get('/:id')
  public async findPost(@Param('id', ParseUUIDPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get<PostRdo>(
      this.getPostPath(id)
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Update post' })
  @Put('/:id')
  public async updatePost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() post: UpdatePostDto
  ) {
    const { data } = await this.httpService.axiosRef.put<PostRdo>(
      this.getPostPath(id),
      post
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Delete post' })
  @Delete('/:id')
  public async deletePost(@Param('id', ParseUUIDPipe) id: string) {
    await this.httpService.axiosRef.delete(this.getPostPath(id));
  }

  @UseGuards(CheckAuthGuard)
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
    @Req() { user }: Required<RequestWithTokenPayload>
  ) {
    const { data } = await this.httpService.axiosRef.post<PostRdo>(
      this.getPostLikePath(id),
      { userId: user.sub }
    );

    return data;
  }

  @UseGuards(CheckAuthGuard)
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
    @Req() { user }: Required<RequestWithTokenPayload>
  ) {
    const { data } = await this.httpService.axiosRef.delete<PostRdo>(
      this.getPostLikePath(id),
      { data: { userId: user.sub } }
    );

    return data;
  }

  @RabbitSubscribe({
    exchange: process.env['RABBIT_EXCHANGE'],
    routingKey: RabbitMqRouting.NotifyPostImageUploaded,
    queue: process.env['RABBIT_QUEUE'],
  })
  public async uploadPostImage(dto: NotifyPostMediaUploadedDto) {
    this.logger.log('Uploading image for post', this.getPostPath(dto.postId));
    this.httpService.axiosRef.put(this.getPostPath(dto.postId), {
      imageSrc: dto.path,
    });
  }

  @RabbitSubscribe({
    exchange: process.env['RABBIT_EXCHANGE'],
    routingKey: RabbitMqRouting.NotifyPostVideoUploaded,
    queue: process.env['RABBIT_QUEUE'],
  })
  public async uploadPostVideo(dto: NotifyPostMediaUploadedDto) {
    this.logger.log('Uploading videao for post', this.getPostPath(dto.postId));
    this.httpService.axiosRef.put(this.getPostPath(dto.postId), {
      videoSrc: dto.path,
    });
  }
}

export { BlogPostsController };

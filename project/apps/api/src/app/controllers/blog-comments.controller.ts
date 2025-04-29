import { buildURI, RequestWithTokenPayload } from '@avylando-readme/core';
import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import {
  BLOG_COMMENTS_CONTROLLER_NAME,
  BlogCommentsEndpoint,
  CommentQuery,
  CommentRdo,
  CreateCommentDto as LibCreateCommentDto,
  UpdateCommentDto as LibUpdateCommentDto,
} from '@project/blog-comment';
import { join } from 'node:path';
import { CreateCommentDto } from '../dto/blog-comments/create-comment.dto';
import { UpdateCommentDto } from '../dto/blog-comments/update-comment.dto';
import { Public } from '../decorators/public.decorator';

@Controller('blog/posts/:postId/comments')
@ApiTags('blog', 'comments')
@ApiBearerAuth('JWT')
class BlogCommentsController {
  private readonly logger = new Logger(BlogCommentsController.name);

  private getCommentsServicePath(postId: string) {
    return buildURI(
      join(this.services.blogServiceUri, BLOG_COMMENTS_CONTROLLER_NAME),
      { pathParams: { postId } }
    );
  }

  private getShowCommentsPath(postId: string, query?: CommentQuery) {
    return buildURI(
      join(this.getCommentsServicePath(postId), BlogCommentsEndpoint.COMMENTS),
      { query: { ...query } }
    );
  }

  private getCommentPath(postId: string, commentId: string) {
    return buildURI(
      join(this.getCommentsServicePath(postId), BlogCommentsEndpoint.COMMENT),
      {
        pathParams: { id: commentId },
      }
    );
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig
  ) {}

  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments by post id',
  })
  @Get('/')
  public async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: CommentQuery
  ) {
    const { data } = await this.httpService.axiosRef.get<CommentRdo[]>(
      this.getShowCommentsPath(postId, query)
    );
    return data;
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created' })
  @Post(BlogCommentsEndpoint.COMMENTS)
  public async createComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: CreateCommentDto
  ) {
    const libDto: LibCreateCommentDto = { ...dto, authorId: user.sub };
    const { data } = await this.httpService.axiosRef.post<CommentRdo>(
      this.getShowCommentsPath(postId),
      libDto
    );
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Get comment by id' })
  @Get(BlogCommentsEndpoint.COMMENT)
  public async getComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    const { data } = await this.httpService.axiosRef.get<CommentRdo>(
      this.getCommentPath(postId, id)
    );
    return data;
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Comment updated' })
  @Put(BlogCommentsEndpoint.COMMENT)
  public async updateComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: UpdateCommentDto
  ) {
    const existingComment = await this.getComment(postId, id);
    if (existingComment.authorId !== user.sub) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    const libDto: LibUpdateCommentDto = { ...dto };
    const { data } = await this.httpService.axiosRef.put<CommentRdo>(
      this.getCommentPath(postId, id),
      libDto
    );
    return data;
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(BlogCommentsEndpoint.COMMENT)
  public async deleteComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() { user }: RequestWithTokenPayload,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    const existingComment = await this.getComment(postId, id);
    if (existingComment.authorId !== user.sub) {
      throw new ForbiddenException('You are not the author of this comment');
    }
    return this.httpService.axiosRef.delete(this.getCommentPath(postId, id));
  }
}

export { BlogCommentsController };

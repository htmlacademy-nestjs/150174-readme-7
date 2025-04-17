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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import {
  BLOG_COMMENTS_CONTROLLER_NAME,
  BlogCommentsEndpoint,
  CommentRdo,
  CreateCommentDto as LibCreateCommentDto,
  UpdateCommentDto as LibUpdateCommentDto,
} from '@project/blog-comment';
import { join } from 'node:path';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { CreateCommentDto } from '../dto/create-comment/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment/update-comment.dto';

@ApiTags('blog', 'comments')
@Controller('blog/posts/:postId/comments')
class BlogCommentsController {
  private readonly logger = new Logger(BlogCommentsController.name);

  private getCommentsServicePath(postId: string) {
    return buildURI(
      join(this.services.blogServiceUri, BLOG_COMMENTS_CONTROLLER_NAME),
      { pathParams: { postId } }
    );
  }

  private getShowCommentsPath(postId: string) {
    return join(
      this.getCommentsServicePath(postId),
      BlogCommentsEndpoint.COMMENTS
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments by post id',
  })
  @Get('/')
  public async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: string
  ) {
    const { data } = await this.httpService.axiosRef.get<CommentRdo[]>(
      this.getShowCommentsPath(postId)
    );
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created' })
  @Post(BlogCommentsEndpoint.COMMENTS)
  public async createComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() { user }: Required<RequestWithTokenPayload>,
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

  @UseGuards(CheckAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment updated' })
  @Put(BlogCommentsEndpoint.COMMENT)
  public async updateComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Req() { user }: Required<RequestWithTokenPayload>,
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

  @UseGuards(CheckAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(BlogCommentsEndpoint.COMMENT)
  public async deleteComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Req() { user }: Required<RequestWithTokenPayload>,
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

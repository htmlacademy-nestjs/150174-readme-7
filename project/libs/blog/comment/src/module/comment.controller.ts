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
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@avylando-readme/core';
import { CommentRdo } from '../rdo/comment.rdo';
import {
  BLOG_COMMENTS_CONTROLLER_NAME,
  BlogCommentsEndpoint,
} from './comment.constants';
import { CommentQuery } from '../query/comment-query.dto';

@ApiTags('comments', 'blog')
@Controller(BLOG_COMMENTS_CONTROLLER_NAME)
class CommentController {
  constructor(protected readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments by post id',
  })
  @Get(BlogCommentsEndpoint.COMMENTS)
  public async getCommentsByPostId(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() query: CommentQuery
  ) {
    const comments = await this.commentService.getCommentsByPostId(
      postId,
      query
    );
    return fillDto(
      CommentRdo,
      comments.map((comment) => comment.toPlainObject())
    );
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created' })
  @Post(BlogCommentsEndpoint.COMMENTS)
  public async createComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.commentService.createComment(postId, dto);
    return fillDto(CommentRdo, comment.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Get comment by id' })
  @Get(BlogCommentsEndpoint.COMMENT)
  public async getComment(
    @Param('postId', ParseUUIDPipe) _postId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    const comment = await this.commentService.findComment(id);
    return fillDto(CommentRdo, comment.toPlainObject());
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Comment updated' })
  @Put(BlogCommentsEndpoint.COMMENT)
  public async updateComment(
    @Param('postId', ParseUUIDPipe) _postId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCommentDto
  ) {
    const comment = await this.commentService.updateComment(id, dto);
    return fillDto(CommentRdo, comment.toPlainObject());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Comment deleted',
  })
  @Delete(BlogCommentsEndpoint.COMMENT)
  public async deleteComment(
    @Param('postId', ParseUUIDPipe) _postId: string,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.commentService.deleteComment(id);
  }
}

export { CommentController };

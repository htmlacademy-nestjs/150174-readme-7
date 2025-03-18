import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comments', 'blog')
@Controller('posts/:postId/comments')
class CommentController {
  constructor(protected readonly commentService: CommentService) {}

  @ApiResponse({ status: 200, description: 'Get comments by post id' })
  @Get('/')
  public async getCommentsByPostId(@Param('postId') postId: string) {
    const comments = await this.commentService.getCommentsByPostId(postId);
    return comments.map((comment) => comment.toPlainObject());
  }

  @ApiResponse({ status: 200, description: 'Get comment by id' })
  @Get('/:id')
  public async getComment(@Param('id') id: string) {
    const comment = await this.commentService.findComment(id);
    return comment.toPlainObject();
  }

  @ApiResponse({ status: 201, description: 'Comment created' })
  @Post('/')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const comment = await this.commentService.createComment(postId, dto);
    return comment.toPlainObject();
  }

  @ApiResponse({ status: 200, description: 'Comment updated' })
  @Put('/:id')
  public async updateComment(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto
  ) {
    const comment = await this.commentService.updateComment(id, dto);
    return comment.toPlainObject();
  }

  @ApiResponse({ status: 200, description: 'Comment deleted' })
  @Delete('/:id')
  public async deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}

export { CommentController };

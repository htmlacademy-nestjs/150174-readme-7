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

@Controller('posts/:postId/comments')
class CommentController {
  constructor(protected readonly commentService: CommentService) {}

  @Get('/')
  getCommentsByPostId(@Param(':postId') postId: string) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @Get('/:id')
  getComment(@Param('id') id: string) {
    return this.commentService.findComment(id);
  }

  @Post('/')
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }

  @Put('/:id')
  updateComment(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.commentService.updateComment(id, dto);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}

export { CommentController };

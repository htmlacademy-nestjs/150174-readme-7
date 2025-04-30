import { IsNumber, IsOptional } from 'class-validator';
import {
  DEFAULT_COMMENTS_LIMIT,
  DEFAULT_COMMENTS_PAGE,
} from '../module/comment.constants';
import { Transform } from 'class-transformer';

class CommentQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_COMMENTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_COMMENTS_LIMIT;

  @Transform(({ value }) => Number(value) || DEFAULT_COMMENTS_PAGE)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_COMMENTS_PAGE;
}

export { CommentQuery };

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DEFAULT_POSTS_SEARCH_LIMIT } from '../module/post.constants';
import { Transform } from 'class-transformer';
import { PostQuery } from './post-query.dto';

class PostSearchQuery extends PostQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_POSTS_SEARCH_LIMIT)
  @IsNumber()
  @IsOptional()
  public override limit: number = DEFAULT_POSTS_SEARCH_LIMIT;

  @IsString()
  public title: string;
}

export { PostSearchQuery };

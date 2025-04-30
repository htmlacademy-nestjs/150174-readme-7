import { PostSortBy, SortDirection, Tag } from '@avylando-readme/core';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  DEFAULT_POSTS_LIMIT,
  DEFAULT_POSTS_PAGE,
  DEFAULT_POSTS_SORT_BY,
  DEFAULT_POSTS_SORT_DIRECTION,
} from '../module/post.constants';
import { Transform } from 'class-transformer';

class PostQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_POSTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit: number = DEFAULT_POSTS_LIMIT;

  @Transform(({ value }) => Number(value) || DEFAULT_POSTS_PAGE)
  @IsNumber()
  @IsOptional()
  public page: number = DEFAULT_POSTS_PAGE;

  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_POSTS_SORT_DIRECTION;

  @IsEnum(PostSortBy)
  @IsOptional()
  public sortBy: PostSortBy = DEFAULT_POSTS_SORT_BY;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  public tags?: Tag[];

  @IsMongoId()
  @IsOptional()
  public authorId?: string;
}

export { PostQuery };

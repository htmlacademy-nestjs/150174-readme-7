import { ForbiddenException, Injectable } from '@nestjs/common';
import { Post } from '@avylando-readme/core';

import { PostRepository } from './post.repository';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { PostFactory } from './post.factory';
import { UpdatePostDto } from '../dto/update-post/update-post.dto';
import { PostQuery } from '../query/post-query.dto';
import { PostSearchQuery } from '../query/post-search-query.dto';

@Injectable()
class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory
  ) {}

  async createPost(dto: CreatePostDto) {
    const newPost = this.postFactory.create(dto as Post);
    return this.postRepository.save(newPost);
  }

  public async findPost(id: string) {
    const post = await this.postRepository.findById(id);
    return post;
  }

  public async updatePost(id: string, dto: UpdatePostDto) {
    const existingPost = await this.findPost(id);

    if (existingPost.authorId !== dto.authorId) {
      throw new ForbiddenException(`You are not allowed to update this post.`);
    }

    const postObject = existingPost.toPlainObject();
    const updatedData = {
      ...postObject,
      ...dto,
      id,
      data: {
        ...postObject.data,
        ...dto.data,
      },
    } as Post;
    const updatedPost = this.postFactory.create(updatedData);

    await this.postRepository.update(updatedPost);

    return updatedPost;
  }

  public async deletePost(id: string) {
    await this.postRepository.deleteById(id);
  }

  public async getPosts(query: PostQuery) {
    const posts = await this.postRepository.findMany(query);
    return posts;
  }

  public async getDraftPosts(userId: string, query: PostQuery) {
    const posts = await this.postRepository.findDrafts(userId, query);
    return posts;
  }

  public async searchPosts(query: PostSearchQuery) {
    const posts = await this.postRepository.findBySearch(query);
    return posts;
  }

  public async addPostToFavorites(id: string, userId: string) {
    const post = await this.postRepository.addPostToFavorites(id, userId);
    return post;
  }

  public async removePostFromFavorites(id: string, userId: string) {
    const post = await this.postRepository.removePostFromFavorites(id, userId);
    return post;
  }

  public async subscribeToAuthor(userId: string, authorId: string) {
    const author = await this.postRepository.subscribeToAuthor(
      userId,
      authorId
    );
    return author;
  }

  public async unsubscribeFromAuthor(userId: string, authorId: string) {
    await this.postRepository.unsubscribeFromAuthor(userId, authorId);
  }

  public async getUserFeed(userId: string, query: PostQuery) {
    const posts = await this.postRepository.getUserFeed(userId, query);
    return posts;
  }
}

export { PostService };

import { Injectable } from '@nestjs/common';
import { Post } from '@avylando-readme/core';

import { PostRepository } from './post.repository';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { PostFactory } from './post.factory';
import { UpdatePostDto } from '../dto/update-post/update-post.dto';
import { PostQuery } from './post.query';

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

  public async addPostToFavorites(id: string, userId: string) {
    const post = await this.postRepository.addPostToFavorites(id, userId);
    return post;
  }

  public async removePostFromFavorites(id: string, userId: string) {
    const post = await this.postRepository.removePostFromFavorites(id, userId);
    return post;
  }
}

export { PostService };

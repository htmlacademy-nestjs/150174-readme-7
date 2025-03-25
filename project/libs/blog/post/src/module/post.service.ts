import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@avylando-readme/core';

import { PostRepository } from './post.repository';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { PostFactory } from './post.factory';

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

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  public async updatePost(id: string, dto: CreatePostDto) {
    const existingPost = await this.findPost(id);
    const updatedData = Object.assign({ id }, existingPost, dto);
    const updatedPost = this.postFactory.create(updatedData as Post);

    await this.postRepository.update(updatedPost);

    return updatedPost;
  }

  public async deletePost(id: string) {
    await this.postRepository.deleteById(id);
  }
}

export { PostService };

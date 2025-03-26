import { Injectable } from '@nestjs/common';
import { Post } from '@avylando-readme/core';

import { PostRepository } from './post.repository';
import { CreatePostDto } from '../dto/create-post/create-post.dto';
import { PostFactory } from './post.factory';
import { UpdatePostDto } from '../dto/update-post/update-post.dto';

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
}

export { PostService };

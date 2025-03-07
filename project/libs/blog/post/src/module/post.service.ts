import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from '../dto/create-post.type';
import { PostFactory } from './post.factory';

@Injectable()
class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory
  ) {}

  async createPost(post: CreatePostDto) {
    const newPost = this.postFactory.create(post);

    await this.postRepository.save(newPost);

    return newPost;
  }

  public async findPost(id: string) {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  public async updatePost(id: string, post: CreatePostDto) {
    const existingPost = await this.findPost(id);

    const updatedPost = this.postFactory.create({
      ...existingPost,
      ...post,
    });

    await this.postRepository.update(updatedPost);

    return updatedPost;
  }

  public async deletePost(id: string) {
    await this.postRepository.deleteById(id);
  }
}

export { PostService };

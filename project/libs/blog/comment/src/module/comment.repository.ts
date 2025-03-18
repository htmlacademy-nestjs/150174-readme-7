import { Injectable } from '@nestjs/common';

import { MemoryRepository, MongoRepository } from '@avylando-readme/core';
import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentModel } from './comment.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
class CommentRepository extends MongoRepository<CommentEntity, CommentModel> {
  constructor(
    entityFactory: CommentFactory,
    @InjectModel(CommentModel.name) commentModel: Model<CommentModel>
  ) {
    super(entityFactory, commentModel);
  }

  async getCommentsByPostId(postId: string): Promise<CommentEntity[]> {
    const comments = await this.model.find({ postId });
    return comments.map((comment) => this.createEntityFromDocument(comment));
  }
}

export { CommentRepository };

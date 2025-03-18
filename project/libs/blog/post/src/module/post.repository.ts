import { MongoRepository } from '@avylando-readme/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PostFactory } from './post.factory';
import { PostEntity } from './entities/post.entity';
import { PostModel } from './post.model';

@Injectable()
class PostRepository extends MongoRepository<PostEntity, PostModel> {
  constructor(
    entityFactory: PostFactory,
    @InjectModel(PostModel.name) model: Model<PostModel>
  ) {
    super(entityFactory, model);
  }
}

export { PostRepository };

import { MongoRepository } from '@avylando-readme/core';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { Injectable } from '@nestjs/common';
import { BlogUserModel } from './blog-user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
class BlogUserRepository extends MongoRepository<
  BlogUserEntity,
  BlogUserModel
> {
  constructor(
    entityFactory: BlogUserFactory,
    @InjectModel(BlogUserModel.name) userModel: Model<BlogUserModel>
  ) {
    super(entityFactory, userModel);
  }

  public async findByEmail(email: string): Promise<BlogUserEntity | null> {
    const user = await this.model.findOne({ email }).exec();

    if (!user) {
      return null;
    }
    return this.createEntityFromDocument(user);
  }
}

export { BlogUserRepository };

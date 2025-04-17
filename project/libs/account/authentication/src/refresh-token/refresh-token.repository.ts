import { MongoRepository } from '@avylando-readme/core';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenFactory } from './refresh-token.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
class RefreshTokenRepository extends MongoRepository<
  RefreshTokenEntity,
  RefreshTokenModel
> {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenModel>,
    private readonly refreshTokenFactory: RefreshTokenFactory
  ) {
    super(refreshTokenFactory, refreshTokenModel);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(
    tokenId: string
  ): Promise<RefreshTokenEntity | null> {
    const refreshTokenDocument = await this.model.findOne({ tokenId }).exec();
    if (!refreshTokenDocument) {
      return null;
    }

    return this.createEntityFromDocument(refreshTokenDocument);
  }

  public async deleteExpiredTokens(): Promise<void> {
    this.model.deleteMany({ expiresIn: { $lt: new Date() } });
  }
}

export { RefreshTokenRepository };

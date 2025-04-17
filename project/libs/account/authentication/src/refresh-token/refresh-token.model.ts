import { JwtToken } from '@avylando-readme/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({
  collection: 'refresh-tokens',
  timestamps: true,
})
class RefreshTokenModel extends Document<ObjectId, any, JwtToken> {
  @Prop({ required: true })
  public userId: string;

  @Prop({ required: true })
  public expiresIn: Date;

  @Prop({ required: true, unique: true })
  public tokenId: string;
}

const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);

export { RefreshTokenModel, RefreshTokenSchema };

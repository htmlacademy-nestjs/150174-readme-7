import { Document, ObjectId } from 'mongoose';
import { User, UserRole, WithOptionalId } from '@avylando-readme/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
class BlogUserModel
  extends Document<ObjectId, any, User>
  implements WithOptionalId<User>
{
  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;

  @Prop({ required: true })
  public avatarSrc: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({ required: true })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  })
  public role: UserRole;
}

const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);

export { BlogUserModel, BlogUserSchema };

import { Document, ObjectId } from 'mongoose';
import { Comment, WithOptionalId } from '@avylando-readme/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'blog-comments',
  timestamps: true,
  id: true,
})
class CommentModel
  extends Document<ObjectId, any, Comment>
  implements WithOptionalId<Comment>
{
  @Prop({ required: true })
  public authorId: string;

  @Prop({ required: true })
  public postId: string;

  @Prop({ required: true })
  public content: string;
}

const CommentSchema = SchemaFactory.createForClass(CommentModel);

export { CommentModel, CommentSchema };

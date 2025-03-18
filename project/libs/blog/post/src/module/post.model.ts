import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  ImagePost,
  LinkPost,
  Post,
  PostStatus,
  QuotePost,
  TextPost,
  VideoPost,
  WithOptionalIdDistributive,
} from '@avylando-readme/core';

@Schema({
  collection: 'blog-posts',
  timestamps: true,
  id: true,
})
class PostModel
  extends Document<ObjectId, any, Post>
  implements WithOptionalIdDistributive<Post>
{
  @Prop({ required: true })
  public authorId: string;

  @Prop({ required: true, type: String, enum: ['draft', 'published'] })
  public status: PostStatus;

  @Prop({
    required: true,
    type: String,
    enum: ['text', 'image', 'link', 'quote', 'video'],
  })
  public kind: Post['kind'];

  @Prop({ type: String })
  public content?: TextPost['content'];

  @Prop({ type: String })
  public name?: TextPost['name'];

  @Prop({ type: String })
  public preview?: TextPost['preview'];

  @Prop({ type: String })
  public link?: LinkPost['link'];

  @Prop({ type: String })
  public description?: LinkPost['description'];

  @Prop({ type: String })
  public imageSrc?: ImagePost['imageSrc'];

  @Prop({ type: String })
  public quote?: QuotePost['quote'];

  @Prop({ type: String })
  public quoteAuthorId?: QuotePost['quoteAuthorId'];

  @Prop({ type: String })
  public videoSrc?: VideoPost['videoSrc'];
}

const PostSchema = SchemaFactory.createForClass(PostModel);

export { PostModel, PostSchema };

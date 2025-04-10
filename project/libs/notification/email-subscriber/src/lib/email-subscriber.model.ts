import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationSubscriber } from '@avylando-readme/core';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class EmailSubscriberModel
  extends Document<ObjectId, any, NotificationSubscriber>
  implements NotificationSubscriber
{
  @Prop()
  public id?: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public firstName: string;

  @Prop({ required: true })
  public lastName: string;
}

const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);

export { EmailSubscriberModel, EmailSubscriberSchema };

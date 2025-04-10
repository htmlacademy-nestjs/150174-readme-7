import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File, WithOptionalDbAttributes } from '@avylando-readme/core';

@Schema({
  collection: 'files',
  timestamps: true,
})
class FileModel
  extends Document<ObjectId, any, File>
  implements WithOptionalDbAttributes<File>
{
  @Prop({ required: true })
  public size!: number;

  @Prop({ required: true })
  public hashName!: string;

  @Prop({ required: true })
  public subDirectory!: string;

  @Prop({ required: true })
  public extension!: string;

  @Prop({ required: true })
  public mimetype!: string;

  @Prop({ required: true })
  public path!: string;

  @Prop({ required: true })
  public originalName!: string;

  @Prop()
  public updatedAt!: Date;

  @Prop()
  public createdAt!: Date;
}

const FileSchema = SchemaFactory.createForClass(FileModel);

export { FileModel, FileSchema };

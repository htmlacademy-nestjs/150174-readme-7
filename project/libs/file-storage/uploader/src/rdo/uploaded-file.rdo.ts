import { File } from '@avylando-readme/core';
import { Expose } from 'class-transformer';

class UploadedFileRdo implements File {
  @Expose()
  public id!: string;

  @Expose()
  public originalName!: string;

  @Expose()
  public subDirectory!: string;

  @Expose()
  public hashName!: string;

  @Expose()
  public extension!: string;

  @Expose()
  public mimetype!: string;

  @Expose()
  public size!: number;

  @Expose()
  public path!: string;

  @Expose()
  public createdAt!: Date;

  @Expose()
  public updatedAt!: Date;
}

export { UploadedFileRdo };

import { Entity, File, StorableEntity } from '@avylando-readme/core';

class FileEntity extends Entity implements StorableEntity<File> {
  public originalName!: string;
  public subDirectory!: string;
  public hashName!: string;
  public extension!: string;
  public path!: string;
  public mimetype!: string;
  public size!: number;

  constructor(file: File) {
    super(file);
    this.populate(file);
  }

  private populate(file: File): void {
    this.originalName = file.originalName;
    this.subDirectory = file.subDirectory;
    this.hashName = file.hashName;
    this.extension = file.extension;
    this.path = file.path;
    this.mimetype = file.mimetype;
    this.size = file.size;
    this.createdAt = file.createdAt;
    this.updatedAt = file.updatedAt;
  }

  public toPlainObject(): File {
    return {
      id: this.id,
      originalName: this.originalName,
      subDirectory: this.subDirectory,
      hashName: this.hashName,
      mimetype: this.mimetype,
      size: this.size,
      path: this.path,
      extension: this.extension,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { FileEntity };

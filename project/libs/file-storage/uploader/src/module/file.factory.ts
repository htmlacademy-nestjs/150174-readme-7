import { BaseFactory, File } from '@avylando-readme/core';
import { FileEntity } from './file.entity';

class FileFactory extends BaseFactory<File, FileEntity> {
  constructor() {
    super(FileEntity);
  }
}

export { FileFactory };

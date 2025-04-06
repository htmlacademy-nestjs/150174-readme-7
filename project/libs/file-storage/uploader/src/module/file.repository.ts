import { MongoRepository } from '@avylando-readme/core';
import { FileEntity } from './file.entity';
import { FileModel } from './file.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileFactory } from './file.factory';

class FileRepository extends MongoRepository<FileEntity, FileModel> {
  constructor(
    entityFactory: FileFactory,
    @InjectModel(FileModel.name) fileModel: Model<FileModel>
  ) {
    super(entityFactory, fileModel);
  }
}

export { FileRepository };

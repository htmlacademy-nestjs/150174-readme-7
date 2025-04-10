import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FileStorageConfigModule,
  getFileStorageMongooseOptions,
} from '@project/file-storage-config';
import { FileUploaderModule } from '@project/file-uploader';

@Module({
  imports: [
    FileUploaderModule,
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getFileStorageMongooseOptions()),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FileFactory } from './file.factory';
import { FileRepository } from './file.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file.model';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  FileStorageConfigModule,
  FileStorageConfigNamespace,
} from '@project/file-storage-config';
import { FileUploaderController } from './file.controller';
import { FileUploaderService } from './file.service';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>(
          `${FileStorageConfigNamespace.APP}.uploadDirectory`
        );
        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
    FileStorageConfigModule,
  ],
  controllers: [FileUploaderController],
  providers: [FileRepository, FileFactory, FileUploaderService],
})
export class FileUploaderModule {}

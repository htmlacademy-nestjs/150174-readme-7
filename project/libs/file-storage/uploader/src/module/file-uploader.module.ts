import { Module } from '@nestjs/common';
import { FileFactory } from './file-uploader.factory';
import { FileRepository } from './file-uploader.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema } from './file-uploader.model';
import { ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  FileStorageConfigModule,
  FileStorageConfigNamespace,
  getFileStorageRabbitMQOptions,
} from '@project/file-storage-config';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';
import { FileStorageNotifyModule } from '@project/file-storage-notify';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
    RabbitMQModule.forRootAsync(getFileStorageRabbitMQOptions()),
    FileStorageConfigModule,
    FileStorageNotifyModule,
  ],
  controllers: [FileUploaderController],
  providers: [FileRepository, FileFactory, FileUploaderService],
})
export class FileUploaderModule {}

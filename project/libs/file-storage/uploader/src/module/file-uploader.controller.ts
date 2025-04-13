import 'multer';
import { Express } from 'express';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidateImagePipe, ValidateMongoIdPipe } from '@project/pipes';

import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { FileUploaderService } from './file-uploader.service';
import { fillDto, RabbitMqRouting } from '@avylando-readme/core';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UpdateAvatarDto } from '@project/account-notify';

@Controller('/')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.uploadFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPlainObject());
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        userId: {
          type: 'string',
          format: 'mongo-id',
        },
      },
    },
  })
  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitMqRouting.UploadAvatar,
    queue: process.env.RABBIT_QUEUE,
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadAvatar(
    @UploadedFile()
    dto: UpdateAvatarDto
  ) {
    console.log('Upload avatar', dto);
    this.fileUploaderService.uploadUserAvatar(dto);
  }

  @Post('/posts/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPostImage(
    @UploadedFile(ValidateImagePipe) file: Express.Multer.File
  ) {
    const fileEntity = await this.fileUploaderService.uploadPostImage(file);
    return fillDto(UploadedFileRdo, fileEntity.toPlainObject());
  }

  @Get(':fileId')
  public async show(@Param('fileId', ValidateMongoIdPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile.toPlainObject());
  }
}

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
import { ValidateMongoIdPipe } from '@project/pipes';

import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { FileUploaderService } from './file-uploader.service';
import { fillDto } from '@avylando-readme/core';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploaderEndpoint } from './file-uploader.constant';

@Controller('/')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post(FileUploaderEndpoint.COMMON)
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

  @Post(FileUploaderEndpoint.AVATAR)
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
  public async uploadAvatar(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    const fileEntity = await this.fileUploaderService.uploadUserAvatar(file);
    return fillDto(UploadedFileRdo, fileEntity.toPlainObject());
  }

  @Post(FileUploaderEndpoint.POST_IMAGE)
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
  public async uploadPostImage(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.uploadPostImage(file);
    return fillDto(UploadedFileRdo, fileEntity.toPlainObject());
  }

  @Get(FileUploaderEndpoint.GET_FILE)
  public async show(@Param('fileId', ValidateMongoIdPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile.toPlainObject());
  }
}

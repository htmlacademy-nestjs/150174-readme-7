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
import { FileUploaderService } from './file.service';
import { fillDto } from '@avylando-readme/core';

@Controller('files')
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.uploadFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPlainObject());
  }

  @Get(':fileId')
  public async show(@Param('fileId', ValidateMongoIdPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile.toPlainObject());
  }
}

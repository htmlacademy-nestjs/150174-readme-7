import 'multer';
import dayjs from 'dayjs';
import { FileRepository } from './file-uploader.repository';
import {
  BadRequestException,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  FileStorageAppConfig,
  FileStorageConfig,
} from '@project/file-storage-config';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import { StoredFile } from '@avylando-readme/core';
import { FileFactory } from './file-uploader.factory';
import { FileEntity } from './file-uploader.entity';

class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MMMM';

  constructor(
    @Inject(FileStorageAppConfig.KEY)
    private readonly fileStorageConfig: FileStorageConfig,
    private readonly fileRepository: FileRepository,
    private readonly fileFactory: FileFactory
  ) {}

  public async uploadUserAvatar(
    file: Express.Multer.File
  ): Promise<FileEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = await this.fileRepository.save(
      this.fileFactory.create(storedFile)
    );
    return fileEntity;
  }

  public async uploadFile(file: Express.Multer.File): Promise<FileEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = await this.fileRepository.save(
      this.fileFactory.create(storedFile)
    );
    return fileEntity;
  }

  public async getFile(id: string): Promise<FileEntity> {
    const file = await this.fileRepository.findById(id);
    if (!file) {
      const message = `File with id ${id} not found`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    return file;
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    if (!file) {
      throw new BadRequestException(`File is required`);
    }

    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const hashName = randomUUID();
      const filename = `${hashName}.${fileExtension}`;

      const path = this.getDestinationFilePath(filename);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        extension: fileExtension as string,
        hashName,
        mimetype: file.mimetype,
        originalName: file.originalname,
        size: file.size,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }

  private getDestinationFilePath(filename: string): string {
    return join(
      this.getUploadDirectoryPath(),
      this.getSubUploadDirectoryPath(),
      filename
    );
  }

  private getUploadDirectoryPath(): string {
    return this.fileStorageConfig.uploadDir;
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }
}

export { FileUploaderService };

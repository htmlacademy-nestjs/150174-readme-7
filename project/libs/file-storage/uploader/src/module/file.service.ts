import 'multer';
import dayjs from 'dayjs';
import { FileRepository } from './file.repository';
import { Inject, Logger } from '@nestjs/common';
import {
  FileStorageConfig,
  FileStorageConfigNamespace,
} from '@project/file-storage-config';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import { File, StoredFile } from '@avylando-readme/core';

class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileStorageConfigNamespace.APP)
    private readonly fileStorageConfig: FileStorageConfig,
    private readonly fileRepository: FileRepository
  ) {}

  public async uploadFile(file: Express.Multer.File): Promise<File> {
    const storedFile = await this.writeFile(file);
    const fileEntity = await this.fileRepository.save(storedFile);
    return fileEntity.toPlainObject();
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const filename = `${randomUUID()}.${fileExtension}`;

      const path = this.getDestinationFilePath(filename);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        extension: fileExtension as string,
        hashName: filename,
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

  public async getFile(fileUrl: string): Promise<Buffer> {
    // Logic to get file
    return Buffer.from('file-data');
  }

  public async deleteFile(fileUrl: string): Promise<void> {
    // Logic to delete file
  }

  private getDestinationFilePath(filename: string): string {
    return join(
      this.getUploadDirectoryPath(),
      this.getSubUploadDirectoryPath(),
      filename
    );
  }

  private getUploadDirectoryPath(): string {
    return this.fileStorageConfig.uploadDirectory;
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }
}

export { FileUploaderService };

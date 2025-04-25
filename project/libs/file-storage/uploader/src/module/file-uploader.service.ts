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
import { FileStorageNotifyService } from '@project/file-storage-notify';

class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MMMM';

  constructor(
    @Inject(FileStorageAppConfig.KEY)
    private readonly appConfig: FileStorageConfig,
    private readonly fileRepository: FileRepository,
    private readonly fileFactory: FileFactory
  ) {}

  public async uploadUserAvatar(
    file: Express.Multer.File
  ): Promise<FileEntity> {
    const fileEntity = await this.uploadFile(
      file,
      this.getAvatarUploadDirectoryPath()
    );

    return fileEntity;
  }

  public async uploadPostImage(file: Express.Multer.File): Promise<FileEntity> {
    return this.uploadFile(file, this.getPostsImageDirectoryPath());
  }

  public async uploadPostVideo(file: Express.Multer.File): Promise<FileEntity> {
    return this.uploadFile(file, this.getPostsVideoDirectoryPath());
  }

  public async uploadFile(
    file: Express.Multer.File,
    uploadDirectoryPath: string = this.getUploadDirectoryPath()
  ): Promise<FileEntity> {
    const storedFile = await this.writeFile(file, uploadDirectoryPath);
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

  public async writeFile(
    file: Express.Multer.File,
    uploadDirectoryPath: string
  ): Promise<StoredFile> {
    if (!file) {
      throw new BadRequestException(`File is required`);
    }

    try {
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const hashName = randomUUID();
      const filename = `${hashName}.${fileExtension}`;

      const path = join(uploadDirectoryPath, subDirectory, filename);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, Buffer.from(file.buffer));

      this.logger.log(`File saved to ${path}`);

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

  private getUploadDirectoryPath(): string {
    return this.appConfig.uploadDir;
  }

  private getAvatarUploadDirectoryPath(): string {
    return join(this.getUploadDirectoryPath(), this.appConfig.avatarsDir);
  }

  private getPostsImageDirectoryPath(): string {
    return join(
      this.getUploadDirectoryPath(),
      this.appConfig.postsAssetsRoot,
      this.appConfig.postsImagesDir
    );
  }

  private getPostsVideoDirectoryPath(): string {
    return join(
      this.getUploadDirectoryPath(),
      this.appConfig.postsAssetsRoot,
      this.appConfig.postsVideosDir
    );
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }
}

export { FileUploaderService };

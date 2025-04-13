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
import { UpdateAvatarDto } from '@project/account-notify';
import { FileStorageNotifyService } from '@project/file-storage-notify';
import { UploadPostMediaDto } from '@project/api-notify';

class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MMMM';

  constructor(
    @Inject(FileStorageAppConfig.KEY)
    private readonly appConfig: FileStorageConfig,
    private readonly fileRepository: FileRepository,
    private readonly fileFactory: FileFactory,
    private readonly notifyService: FileStorageNotifyService
  ) {}

  public async uploadUserAvatar({
    userId,
    file,
  }: UpdateAvatarDto): Promise<FileEntity> {
    const fileEntity = await this.uploadFile(
      file,
      this.getAvatarUploadDirectoryPath()
    );

    const published = await this.notifyService.notifyAvatarUploaded({
      userId,
      path: fileEntity.path,
    });
    this.logger.log(
      `Avatar uploaded for user ${userId} and published to RabbitMQ: ${published}`
    );

    return fileEntity;
  }

  public async uploadPostImage({
    postId,
    file,
  }: UploadPostMediaDto): Promise<FileEntity> {
    const fileEntity = await this.uploadFile(
      file,
      this.getPostsImageDirectoryPath()
    );

    const published = await this.notifyService.notifyPostImageUploaded({
      postId,
      path: fileEntity.path,
    });

    this.logger.log(
      `Post ${postId} image uploaded and published to RabbitMQ: ${published}`
    );
    return fileEntity;
  }

  public async uploadPostVideo({
    postId,
    file,
  }: UploadPostMediaDto): Promise<FileEntity> {
    const fileEntity = await this.uploadFile(
      file,
      this.getPostsVideoDirectoryPath()
    );

    const published = await this.notifyService.notifyPostVideoUploaded({
      postId,
      path: fileEntity.path,
    });

    this.logger.log(
      `Post ${postId} video uploaded and published to RabbitMQ: ${published}`
    );
    return fileEntity;
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

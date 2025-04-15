import { fileToFormData, Post } from '@avylando-readme/core';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import { CreatePostDto as LibCreatePostDto } from '@project/blog-post';
import { FileUploaderEndpoint, UploadedFileRdo } from '@project/file-uploader';
import { join } from 'node:path';
import { CreatePostDto } from '../dto/create-post/create-post.dto';

@Injectable()
class BlogPostService {
  private readonly logger = new Logger(BlogPostService.name);

  private getPostImageUploadPath() {
    return join(
      this.services.fileStorageServiceUri,
      FileUploaderEndpoint.POST_IMAGE
    );
  }

  private getPostVideoUploadPath() {
    return join(
      this.services.fileStorageServiceUri,
      FileUploaderEndpoint.POST_VIDEO
    );
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig
  ) {}

  public async handlePostAssets(
    post: CreatePostDto,
    files?: {
      image?: Express.Multer.File[];
      video?: Express.Multer.File[];
    }
  ): Promise<Omit<LibCreatePostDto, 'authorId'>> {
    const { image, video } = files || {};
    const postImage = image?.[0];
    const postVideo = video?.[0];
    if (
      (post.kind === 'image' && !postImage) ||
      (post.kind === 'video' && !postVideo)
    ) {
      throw new BadRequestException(`Post kind and file type mismatch`);
    }

    let postData: LibCreatePostDto['data'] = { ...post.data };
    if (postImage) {
      const file = await this.uploadPostImage(postImage);
      this.logger.log(`Image file uploaded: ${file.path}`);
      postData = { ...postData, imageSrc: file.path };
    }

    if (postVideo) {
      const file = await this.uploadPostVideo(postVideo);
      this.logger.log(`Video file uploaded: ${file.path}`);
      postData = { ...postData, videoSrc: file.path };
    }

    return {
      ...post,
      data: postData,
    };
  }

  private async uploadPostImage(file: Express.Multer.File) {
    return this.uploadPostFile(file, this.getPostImageUploadPath());
  }

  private async uploadPostVideo(file: Express.Multer.File) {
    return this.uploadPostFile(file, this.getPostVideoUploadPath());
  }

  private async uploadPostFile(
    file: Express.Multer.File,
    servicePath: string
  ): Promise<UploadedFileRdo> {
    const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
      servicePath,
      fileToFormData(file),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }
}

export { BlogPostService };

import { fileToFormData } from '@avylando-readme/core';
import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
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

  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig
  ) {}

  public async handlePostAssets(
    post: CreatePostDto,
    files?: {
      image?: Express.Multer.File[];
    }
  ): Promise<Omit<LibCreatePostDto, 'authorId'>> {
    if (post.kind !== 'image')
      return post as Omit<LibCreatePostDto, 'authorId'>;

    return this.handlePostImage(post, files);
  }

  private async handlePostImage(
    post: CreatePostDto,
    files?: {
      image?: Express.Multer.File[];
    }
  ): Promise<Omit<LibCreatePostDto, 'authorId'>> {
    const { image } = files || {};
    const postImage = image?.[0];
    if (!postImage) {
      throw new UnprocessableEntityException(
        `Post kind and file type mismatch`
      );
    }

    const file = await this.uploadPostImage(postImage);
    this.logger.log(`Image file uploaded: ${file.path}`);
    return {
      ...post,
      data: { ...post.data, imageSrc: file.path },
    };
  }

  private async uploadPostImage(file: Express.Multer.File) {
    return this.uploadPostFile(file, this.getPostImageUploadPath());
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

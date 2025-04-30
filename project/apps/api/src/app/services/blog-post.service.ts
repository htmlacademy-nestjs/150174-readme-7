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
import {
  CreatePostDto as LibCreatePostDto,
  UpdatePostDto as LibUpdatePostDto,
} from '@project/blog-post';
import { FileUploaderEndpoint, UploadedFileRdo } from '@project/file-uploader';
import { join } from 'node:path';
import { CreatePostDto } from '../dto/blog-posts/create-post/create-post.dto';
import { UpdatePostDto } from '../dto/blog-posts/update-post.dto';

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

  public async handlePostAssets<T extends CreatePostDto | UpdatePostDto>(
    post: T,
    files: {
      image?: Express.Multer.File;
    }
  ): Promise<Omit<LibCreatePostDto, 'authorId'>> {
    if (post.kind !== 'image')
      return post as Omit<LibCreatePostDto, 'authorId'>;

    const { image } = files;
    if (post.kind === 'image' && !image) {
      throw new UnprocessableEntityException(
        `Post kind and file type mismatch`
      );
    }

    return this.handlePostImage(post, image);
  }

  private async handlePostImage<T extends CreatePostDto | UpdatePostDto>(
    post: T,
    image: Express.Multer.File
  ): Promise<Omit<LibCreatePostDto, 'authorId'>> {
    const file = await this.uploadPostImage(image);
    this.logger.log(`Image file uploaded: ${file.path}`);
    return {
      ...post,
      data: { ...post.data, imageSrc: file.path },
    } as Omit<LibCreatePostDto, 'authorId'>;
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

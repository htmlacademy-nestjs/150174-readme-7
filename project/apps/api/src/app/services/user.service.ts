import { fileToFormData, User } from '@avylando-readme/core';
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import {
  API_SERVICES_PROVIDER_NAME,
  ApiServicesConfig,
} from '@project/api-config';
import { FileUploaderEndpoint, UploadedFileRdo } from '@project/file-uploader';
import { join } from 'node:path';

@Injectable()
class UserService {
  private getAvatarUploadPath() {
    return join(
      this.services.fileStorageServiceUri,
      FileUploaderEndpoint.AVATAR
    );
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject(API_SERVICES_PROVIDER_NAME)
    private readonly services: ApiServicesConfig
  ) {}

  public async handleUserAssets(
    avatar: Express.Multer.File
  ): Promise<Pick<Required<User>, 'avatarSrc'>> {
    const uploadedFile = await this.uploadAvatar(avatar);
    return {
      avatarSrc: uploadedFile.path,
    };
  }

  private async uploadAvatar(
    file: Express.Multer.File
  ): Promise<UploadedFileRdo> {
    const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
      this.getAvatarUploadPath(),
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

export { UserService };

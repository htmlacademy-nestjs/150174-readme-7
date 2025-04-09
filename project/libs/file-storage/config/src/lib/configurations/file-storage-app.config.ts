import { AppBaseConfigSchema, createAppBaseConfig } from '@avylando/config';
import {
  FileStorageConfigErrorMessages,
  FileStorageConfigNamespace,
} from '../file-storage-config.constants';
import { IsString } from 'class-validator';

class FileStorageAppConfigSchema extends AppBaseConfigSchema {
  @IsString({
    message: FileStorageConfigErrorMessages.uploadDir,
  })
  uploadDir: string;

  @IsString({
    message: FileStorageConfigErrorMessages.avatarsDir,
  })
  avatarsDir: string;

  @IsString({
    message: FileStorageConfigErrorMessages.postsAssetsRoot,
  })
  postsAssetsRoot: string;

  @IsString({
    message: FileStorageConfigErrorMessages.postsVideosDir,
  })
  postsVideosDir: string;

  @IsString({
    message: FileStorageConfigErrorMessages.postsImagesDir,
  })
  postsImagesDir: string;
}

const registerConfig = createAppBaseConfig(FileStorageAppConfigSchema, {
  uploadDir: { envVariable: 'UPLOAD_DIRECTORY' },
  avatarsDir: { envVariable: 'AVATARS_DIR' },
  postsAssetsRoot: { envVariable: 'POSTS_ASSETS_ROOT' },
  postsVideosDir: { envVariable: 'POSTS_VIDEOS_DIR' },
  postsImagesDir: { envVariable: 'POSTS_IMAGES_DIR' },
});

export default registerConfig(FileStorageConfigNamespace.APP);

const FileStorageConfigNamespace = {
  APP: 'file-storage-app',
  MONGO: 'file-storage-mongo-db',
  RABBIT: 'file-storage-rabbit-mq',
} as const;

const FileStorageConfigErrorMessages = {
  uploadDir: 'uploadDirectory is required',
  avatarsDir: 'avatarsDir is required',
  postsAssetsRoot: 'postsAssetsRoot is required',
  postsVideosDir: 'postsVideosDir is required',
  postsImagesDir: 'postsImagesDir is required',
} as const;

export { FileStorageConfigNamespace, FileStorageConfigErrorMessages };

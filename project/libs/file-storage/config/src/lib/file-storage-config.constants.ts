const FileStorageConfigNamespace = {
  APP: 'file-storage-app',
  MONGO: 'file-storage-mongo-db',
} as const;

const FileStorageConfigErrorMessages = {
  uploadDirectory: 'uploadDirectory is required',
} as const;

export { FileStorageConfigNamespace, FileStorageConfigErrorMessages };

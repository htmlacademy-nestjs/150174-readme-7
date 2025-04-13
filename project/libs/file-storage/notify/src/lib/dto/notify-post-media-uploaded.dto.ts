import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

class NotifyPostMediaUploadedDto {
  @IsUUID()
  @Expose()
  postId: string;

  @IsString()
  @Expose()
  path: string;
}

export { NotifyPostMediaUploadedDto };

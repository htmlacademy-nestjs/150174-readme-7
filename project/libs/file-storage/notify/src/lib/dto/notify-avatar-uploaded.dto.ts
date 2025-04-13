import { Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

class NotifyAvatarUploadedDto {
  @IsMongoId()
  @Expose()
  userId: string;

  @IsString()
  @Expose()
  path: string;
}

export { NotifyAvatarUploadedDto };

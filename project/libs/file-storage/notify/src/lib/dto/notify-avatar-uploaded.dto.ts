import { Expose } from 'class-transformer';
import { IsMongoId, IsUrl } from 'class-validator';

class NotifyAvatarUploadedDto {
  @IsMongoId()
  @Expose()
  userId: string;

  @IsUrl({ require_host: false, require_protocol: false, require_port: false })
  @Expose()
  path: string;
}

export { NotifyAvatarUploadedDto };

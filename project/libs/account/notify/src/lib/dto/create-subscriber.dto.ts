import { NotificationSubscriber } from '@avylando-readme/core';
import { Expose } from 'class-transformer';
import { IsEmail, IsMongoId, IsString } from 'class-validator';

class CreateSubscriberDto implements NotificationSubscriber {
  @IsMongoId()
  @Expose()
  id: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  lastName: string;
}

export { CreateSubscriberDto };

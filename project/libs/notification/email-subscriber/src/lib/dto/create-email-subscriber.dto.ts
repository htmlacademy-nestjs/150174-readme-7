import { NotificationSubscriber } from '@avylando-readme/core';
import { Expose } from 'class-transformer';
import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

class CreateEmailSubscriberDto implements NotificationSubscriber {
  @IsMongoId({
    message: 'Invalid id format',
  })
  @IsOptional()
  @Expose()
  id: string;

  @IsEmail(
    {},
    {
      message: 'Email must be a valid email address',
    }
  )
  @Expose()
  email: string;

  @IsString({
    message: 'First name must be a string',
  })
  @Expose()
  firstName: string;

  @IsString({
    message: 'Last name must be a string',
  })
  @Expose()
  lastName: string;
}

export { CreateEmailSubscriberDto };

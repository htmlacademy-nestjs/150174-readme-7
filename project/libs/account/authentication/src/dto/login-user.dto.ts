import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { LoginUserValidationMessage } from './dto-validations.const';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'wasd@mail.com',
  })
  @IsEmail({}, { message: LoginUserValidationMessage.email })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User password',
    type: 'string',
    example: 'ed323cw!4cds!D',
  })
  @IsString({ message: LoginUserValidationMessage.password })
  @Expose()
  public password: string;
}

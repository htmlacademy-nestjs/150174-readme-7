import { NestFactory } from '@nestjs/core';
import { AuthenticationService } from '@project/authentication';
import { AppModule } from './app/app.module';

function getUsers() {
  return [
    {
      email: 'example@mail.com',
      password: '123456',
      firstName: 'Иван',
      lastName: 'Иванов',
      avatarSrc: 'https://example.com/avatar.jpg',
    },
    {
      email: 'user@mail.cu',
      password: '12345',
      firstName: 'Петр',
      lastName: 'Петров',
      avatarSrc: 'https://example.com/avatar.jpg',
    },
  ];
}

async function seedDb(authenticationService: AuthenticationService) {
  const users = getUsers();
  for (const user of users) {
    await authenticationService.register(user);
  }

  console.log('Users seeded');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get(AuthenticationService);
  if (service) {
    await seedDb(service);
    await app.close();
    process.exit(0);
  } else {
    console.error('AuthenticationService not found');
    await app.close();
    process.exit(1);
  }
}

bootstrap();

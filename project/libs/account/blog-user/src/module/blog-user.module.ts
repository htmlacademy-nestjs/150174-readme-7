import { Module } from '@nestjs/common';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserFactory } from './blog-user.factory';

@Module({
  providers: [BlogUserRepository, BlogUserFactory],
  exports: [BlogUserRepository, BlogUserFactory],
})
export class BlogUserModule {}

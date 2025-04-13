import multer from 'multer';
import { CanActivate, ExecutionContext } from '@nestjs/common';

import { AxiosRequestConfig } from 'axios';

export class CheckPostDataGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return true;
  }
}

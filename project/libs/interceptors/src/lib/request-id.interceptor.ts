import * as crypto from 'crypto';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    if (request.headers) {
      const requestId = crypto.randomUUID();
      request.headers['X-Request-Id'] = requestId;

      Logger.log(
        `[${request.method}: ${request.url}]: RequestID is ${requestId}`
      );
    }

    return next.handle();
  }
}

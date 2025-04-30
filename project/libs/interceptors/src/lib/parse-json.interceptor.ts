import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export function ParseJsonInterceptor(fields: string[]): Type<NestInterceptor> {
  class ParseJsonInterceptorClass implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      if (request.body) {
        fields.forEach((field) => {
          if (request.body[field]) {
            request.body[field] = JSON.parse(request.body[field]);
          }
        });
      }
      return next.handle();
    }
  }
  const Interceptor = mixin(ParseJsonInterceptorClass);
  return Interceptor as Type<NestInterceptor>;
}

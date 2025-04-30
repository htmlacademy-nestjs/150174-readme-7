import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaHttpError } from '@avylando-readme/core';
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    const statusCode = PrismaHttpError[exception.code];

    if (statusCode) {
      response.status(statusCode).json({
        statusCode,
        message,
        source: 'PrismaClientExceptionFilter',
      });
      return;
    }

    super.catch(exception, host);
  }
}

import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { Request } from 'express';
  
  @Injectable()
  export class ApiKeyGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest<Request>();
      const provided = req.header('x-api-key') || req.query.api_key;
      const expected = this.configService.get<string>('API_KEY');
  
      if (!expected) {
        throw new UnauthorizedException('Server API key not configured');
      }
  
      if (!provided || provided !== expected) {
        throw new UnauthorizedException('Invalid API key');
      }
      return true;
    }
  }
  
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiKeyGuard } from '../common/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('api')
export class TestController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  root() {
    return { status: 'ok', message: 'API root' };
  }

  @Get('test')
  getTest() {
    return { success: true, message: 'GET test endpoint' };
  }

  @Post('test')
  postTest(@Body() payload: any) {
    const apiKeyFromEnv = this.configService.get<string>('API_KEY');
    return { success: true, received: payload, apiKeyFromEnv };
  }
}

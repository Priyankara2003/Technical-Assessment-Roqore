import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { ApiKeyGuard } from '../common/api-key.guard';

@Module({
  controllers: [TestController],
  providers: [ApiKeyGuard],
})
export class TestModule {}

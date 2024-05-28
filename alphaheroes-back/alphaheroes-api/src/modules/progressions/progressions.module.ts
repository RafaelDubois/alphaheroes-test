import { Module } from '@nestjs/common';
import { ProgressionsController } from './progressions.controller';
import { ProgressionsService } from './progressions.service';
import { progressionsProviders } from './progressions.provider';

@Module({
  providers: [ProgressionsService, ...progressionsProviders],
  controllers: [ProgressionsController],
  exports: [ProgressionsService],
})
export class ProgressionsModule {}

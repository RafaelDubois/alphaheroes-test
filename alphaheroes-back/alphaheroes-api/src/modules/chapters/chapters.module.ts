import { Module } from '@nestjs/common';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { chaptersProviders } from './chapters.provider';

@Module({
  providers: [ChaptersService, ...chaptersProviders],
  controllers: [ChaptersController],
  exports: [ChaptersService],
})
export class ChaptersModule {}

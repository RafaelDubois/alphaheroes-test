import { Module } from '@nestjs/common';
import { ExercisesProgressService } from './exercises-progress.service';
import { ExercisesProgressController } from './exercises-progress.controller';
import { progressProviders } from './exercises-progress.provider';

@Module({
  providers: [ExercisesProgressService, ...progressProviders],
  controllers: [ExercisesProgressController],
  exports: [ExercisesProgressService],
})
export class ExercisesProgressModule {}

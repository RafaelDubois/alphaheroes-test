import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { exercisesProviders } from './exercises.provider';

@Module({
  providers: [ExercisesService, ...exercisesProviders],
  controllers: [ExercisesController],
  exports: [ExercisesService],
})
export class ExercisesModule {}

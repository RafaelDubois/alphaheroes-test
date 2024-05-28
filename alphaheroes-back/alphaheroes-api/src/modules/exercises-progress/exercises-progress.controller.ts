import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ExercisesProgressService } from './exercises-progress.service';
import { AuthGuard } from '@nestjs/passport';
import { ExerciseProgress } from './exercises-progress.entity';

@Controller('exercises-progress')
export class ExercisesProgressController {
  constructor(
    private readonly exerciceProgressService: ExercisesProgressService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:profileId/exercise/:exerciseId')
  async getExerciseProgress(
    @Param('profileId') profileId: number,
    @Param('exerciseId') exerciseId: number,
  ) {
    return await this.exerciceProgressService.getExerciseProgress(
      profileId,
      exerciseId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:profileId')
  async getExerciseProgressByProfile(@Param('profileId') profileId: number) {
    return await this.exerciceProgressService.getExerciseProgressByProfile(
      profileId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile/:profileId/chapter/:exerciseId')
  async updateExerciseProgress(
    @Param('profileId') profileId: number,
    @Param('exerciseId') exerciseId: number,
    @Body() data: ExerciseProgress,
  ) {
    return await this.exerciceProgressService.updateExerciseProgress(
      profileId,
      exerciseId,
      data,
    );
  }
}

import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  async findAll() {
    return await this.exercisesService.getExercises();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.exercisesService.getExercise(id);
  }

  @Put(':id')
  async update(@Param('id') id: number) {
    return this.exercisesService.updateExercise(id);
  }

  @Put('reset')
  async reset() {
    return this.exercisesService.resetCompletedExercises();
  }
}

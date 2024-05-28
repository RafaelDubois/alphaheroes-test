import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesProgressController } from './exercises-progress.controller';

describe('ExercisesProgressController', () => {
  let controller: ExercisesProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesProgressController],
    }).compile();

    controller = module.get<ExercisesProgressController>(
      ExercisesProgressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesProgressService } from './exercises-progress.service';

describe('ExercisesProgressService', () => {
  let service: ExercisesProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExercisesProgressService],
    }).compile();

    service = module.get<ExercisesProgressService>(ExercisesProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

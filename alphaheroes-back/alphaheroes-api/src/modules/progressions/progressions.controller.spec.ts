import { Test, TestingModule } from '@nestjs/testing';
import { ProgressionsController } from './progressions.controller';

describe('ProgressionsController', () => {
  let controller: ProgressionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressionsController],
    }).compile();

    controller = module.get<ProgressionsController>(ProgressionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

// This is a test suite for the AuthController
describe('AuthController', () => {
  let controller: AuthController;

  // Before each test, we create a new testing module and get an instance of AuthController
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    // Get an instance of AuthController from the testing module
    controller = module.get<AuthController>(AuthController);
  });

  // This is a simple test that checks if the AuthController is defined
  it('should be defined', () => {
    // If the controller is undefined, this test will fail
    expect(controller).toBeDefined();
  });
});

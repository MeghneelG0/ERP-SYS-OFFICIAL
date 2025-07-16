import { Test, TestingModule } from '@nestjs/testing';
import { QacController } from './qac.controller';

describe('QacController', () => {
  let controller: QacController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QacController],
    }).compile();

    controller = module.get<QacController>(QacController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

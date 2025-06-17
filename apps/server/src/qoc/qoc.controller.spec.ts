import { Test, TestingModule } from '@nestjs/testing';
import { QocController } from './qoc.controller';

describe('QocController', () => {
  let controller: QocController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QocController],
    }).compile();

    controller = module.get<QocController>(QocController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

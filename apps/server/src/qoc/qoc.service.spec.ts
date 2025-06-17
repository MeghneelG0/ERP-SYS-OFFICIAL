import { Test, TestingModule } from '@nestjs/testing';
import { QocService } from './qoc.service';

describe('QocService', () => {
  let service: QocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QocService],
    }).compile();

    service = module.get<QocService>(QocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

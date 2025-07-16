import { Test, TestingModule } from '@nestjs/testing';
import { QacService } from './qac.service';

describe('QacService', () => {
  let service: QacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QacService],
    }).compile();

    service = module.get<QacService>(QacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

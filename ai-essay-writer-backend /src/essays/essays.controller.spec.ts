import { Test, TestingModule } from '@nestjs/testing';
import { EssaysController } from './essays.controller';
import { EssaysService } from './essays.service';
import { Essay } from './essay.entity';

const mockEssay = {
  id: 1,
  title: 'Test Essay',
  content: 'This is a test essay.',
  topic: 'Test',
  user: { id: 1 },
};

describe('EssaysController', () => {
  let controller: EssaysController;
  let service: EssaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EssaysController],
      providers: [
        {
          provide: EssaysService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockEssay]),
            findOne: jest.fn().mockResolvedValue(mockEssay),
            create: jest.fn().mockResolvedValue(mockEssay),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<EssaysController>(EssaysController);
    service = module.get<EssaysService>(EssaysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of essays', async () => {
    expect(await controller.findAll({ user: { id: 1 } })).toEqual([mockEssay]);
  });

  it('should return a single essay', async () => {
    expect(await controller.findOne('1', { user: { id: 1 } })).toEqual(mockEssay);
  });

  it('should create an essay', async () => {
    expect(await controller.create(mockEssay as Essay, { user: { id: 1 } })).toEqual(mockEssay);
  });

  it('should remove an essay', async () => {
    expect(await controller.remove('1', { user: { id: 1 } })).toBeUndefined();
  });
});
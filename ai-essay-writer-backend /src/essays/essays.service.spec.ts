import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { EssaysService } from './essays.service';
import { Essay } from './essay.entity';
import { CreateEssayDto } from './dto/create-essay.dto';
import { plainToClass } from 'class-transformer';

const mockEssay = {
  id: 1,
  title: 'Test Essay',
  content: 'This is a test essay.',
  topic: 'Test',
  user: { id: 1 },
};

describe('EssaysService', () => {
  let service: EssaysService;
  let repository: Repository<Essay>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EssaysService,
        {
          provide: getRepositoryToken(Essay),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EssaysService>(EssaysService);
    repository = module.get<Repository<Essay>>(getRepositoryToken(Essay));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an essay', async () => {
    const createEssayDto = plainToClass(CreateEssayDto, {
      title: 'Test Essay',
      content: 'This is a test essay.',
      topic: 'Test',
    });
    jest.spyOn(repository, 'create').mockReturnValue(mockEssay as Essay);
    jest.spyOn(repository, 'save').mockResolvedValue(mockEssay as Essay);
    expect(await service.create(createEssayDto, 1)).toEqual(mockEssay);
  });

  it('should find an essay by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockEssay as Essay);
    expect(await service.findOne(1, 1)).toEqual(mockEssay);
  });

  it('should find all essays', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([mockEssay] as Essay[]);
    expect(await service.findAll(1)).toEqual([mockEssay]);
  });

  it('should remove an essay', async () => {
    const deleteResult: DeleteResult = { raw: [], affected: 1 };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
    expect(await service.remove(1, 1)).toBeUndefined();
  });
});
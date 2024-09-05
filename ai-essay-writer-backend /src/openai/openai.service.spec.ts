import { Test, TestingModule } from '@nestjs/testing';
import { EssaysController } from './../essays/essays.controller';
import { EssaysService } from './../essays/essays.service';
import { OpenAIService } from './openai.service';
import { Essay } from './../essays/essay.entity';
import { AppModule } from './../app.module';  
import { INestApplication } from '@nestjs/common';

const mockEssay: Essay = {
  id: 1,
  title: 'Test Essay',
  content: 'This is a test essay.',
  topic: 'Test',
  user: { id: 1 } as any,
};


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

describe('EssaysController', () => {
  let controller: EssaysController;
  let essaysService: EssaysService;
  let openAIService: OpenAIService;

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
        {
          provide: OpenAIService,
          useValue: {
            generateEssay: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EssaysController>(EssaysController);
    essaysService = module.get<EssaysService>(EssaysService);
    openAIService = module.get<OpenAIService>(OpenAIService);
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
    expect(await controller.create(mockEssay, { user: { id: 1 } })).toEqual(mockEssay);
  });

  it('should remove an essay', async () => {
    expect(await controller.remove('1', { user: { id: 1 } })).toBeUndefined();
  });

  it('should generate a citation', async () => {
    const citationDto = { source: 'Test Source', style: 'APA' };
    const expectedCitation = 'Generated citation for "Test Source" in APA style';
    
    expect(await controller.generateCitation(citationDto)).toEqual({ citation: expectedCitation });
  });

  describe('generateEssay', () => {
    it('should generate an essay', async () => {
      const topic = 'Test Topic';
      const generatedEssay = 'Generated essay content';
      jest.spyOn(openAIService, 'generateEssay').mockResolvedValue(generatedEssay);

      const result = await controller.generateEssay(topic);

      expect(result).toEqual({ essay: generatedEssay });
      expect(openAIService.generateEssay).toHaveBeenCalledWith(topic);
    });

    it('should handle errors during essay generation', async () => {
        const topic = 'Test Topic';
        jest.spyOn(openAIService, 'generateEssay').mockRejectedValue(new Error('Essay generation failed'));
      
        await expect(controller.generateEssay(topic)).rejects.toThrow('Essay generation failed');
      });
  });
});
});

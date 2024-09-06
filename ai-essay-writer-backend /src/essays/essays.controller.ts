import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { EssaysService } from './essays.service';
import { Essay } from './essay.entity';
import { CreateEssayDto } from './dto/create-essay.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OpenAIService } from '../openai/openai.service';
import { RateLimit } from 'nestjs-rate-limiter';


@Controller('essays')
export class EssaysController {
  constructor(
    private readonly essaysService: EssaysService,
    private readonly openAIService: OpenAIService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEssayDto: CreateEssayDto, @Request() req): Promise<Essay> {
    return this.essaysService.create(createEssayDto, req.user.id);
  } 

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Essay[]> {
    return this.essaysService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Essay> {
    return this.essaysService.findOne(+id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.essaysService.remove(+id, req.user.id);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  @RateLimit({
    keyPrefix: 'generate-essay',
    points: 5,
    duration: 60,
  })
  async generateEssay(@Body() essayParams: {
    topic: string,
    pages: string,
    paperType: string,
    writerModel: string,
    subjectArea: string,
    instructions: string
  }, @Request() req): Promise<{ essay: string }> {
    try {
      console.log('Received essay generation request:', essayParams);
      console.log('User from request:', req.user);
      const prompt = `Write a ${essayParams.paperType} about "${essayParams.topic}" in the subject area of ${essayParams.subjectArea}. The essay should be approximately ${essayParams.pages}. Additional instructions: ${essayParams.instructions}`;
      const essay = await this.openAIService.generateEssay(prompt);
      console.log('Generated essay:', essay);
      
      if (!req.user || !req.user.id) {
        throw new HttpException('User not authenticated', HttpStatus.UNAUTHORIZED);
      }

      const createEssayDto: CreateEssayDto = {
        title: essayParams.topic,
        content: essay,
        topic: essayParams.topic,
        paperType: essayParams.paperType,
        subjectArea: essayParams.subjectArea,
      };
      console.log('User ID:', req.user.id);
      const savedEssay = await this.essaysService.create(createEssayDto, req.user.id);
      console.log('Saved essay:', savedEssay);
      
      return { essay };
    } catch (error) {
      console.error('Essay generation failed:', error);
      throw new HttpException('Essay generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('generate-citation')
  async generateCitation(@Body() citationDto: { source: string; style: string }): Promise<{ citation: string }> {
    const citation = await this.openAIService.generateCitation(citationDto.source, citationDto.style);
    return { citation };
  }

  @Post('autocomplete')
  async autocomplete(@Body() autocompleteDto: { prompt: string }): Promise<{ completion: string }> {
    const completion = await this.openAIService.autocomplete(autocompleteDto.prompt);
    return { completion };
  }

  @Post('generate-from-file')
  async generateFromFile(@Body() generateDto: { fileContent: string; prompt: string }): Promise<{ content: string }> {
    const content = await this.openAIService.generateFromFile(generateDto.fileContent, generateDto.prompt);
    return { content };
  }

  @Post('test-create')
  async testCreate(@Body() createEssayDto: CreateEssayDto): Promise<Essay> {
    return this.essaysService.create(createEssayDto, 1); // Using a dummy user ID of 1
  }
}


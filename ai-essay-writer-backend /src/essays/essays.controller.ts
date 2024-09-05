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
  @RateLimit({
    keyPrefix: 'generate-essay',
    points: 5,
    duration: 60,
  })
async generateEssay(@Body('topic') topic: string): Promise<{ essay: string }> {
  try {
  console.log('Received essay generation request for topic:', topic);
  const essay = await this.openAIService.generateEssay(topic);
  console.log('Generated essay:', essay);
  return { essay };
  } catch (error) {
    throw new HttpException('Essay generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
  }

}


@Post('generate-citation')
async generateCitation(@Body() citationDto: { source: string; style: string }): Promise<{ citation: string }> {
  // TODO: Implement actual citation generation logic
  const citation = `Generated citation for "${citationDto.source}" in ${citationDto.style} style`;
  return { citation };
}
@Post('test-create')
async testCreate(@Body() createEssayDto: CreateEssayDto): Promise<Essay> {
  return this.essaysService.create(createEssayDto, 1); // Using a dummy user ID of 1
}



}


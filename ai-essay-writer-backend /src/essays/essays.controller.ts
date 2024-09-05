import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { EssaysService } from './essays.service';
import { Essay } from './essay.entity';
import { CreateEssayDto } from './dto/create-essay.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OpenAIService } from '../openai/openai.service';


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
async generateEssay(@Body('topic') topic: string): Promise<{ essay: string }> {
  console.log('Received essay generation request for topic:', topic);
  const essay = await this.openAIService.generateEssay(topic);
  console.log('Generated essay:', essay);
  return { essay };
}
}
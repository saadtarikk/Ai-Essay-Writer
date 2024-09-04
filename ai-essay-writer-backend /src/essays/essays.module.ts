import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EssaysService } from './essays.service';
import { EssaysController } from './essays.controller';
import { Essay } from './essay.entity';
import { OpenAIService } from '../openai/openai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Essay])],
  providers: [EssaysService, OpenAIService],
  controllers: [EssaysController],
})
export class EssaysModule {}
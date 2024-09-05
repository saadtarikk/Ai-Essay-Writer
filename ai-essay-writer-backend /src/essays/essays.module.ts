import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EssaysService } from './essays.service';
import { EssaysController } from './essays.controller';
import { Essay } from './essay.entity';
import { OpenAIService } from '../openai/openai.service';
import { OpenAIModule } from '../openai/openai.module';


@Module({
  imports: [TypeOrmModule.forFeature([Essay]), OpenAIModule],
  providers: [EssaysService, OpenAIService],
  controllers: [EssaysController],
  exports: [EssaysService],
})
export class EssaysModule {}
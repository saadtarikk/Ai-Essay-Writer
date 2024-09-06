import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Essay } from './essay.entity';
import { CreateEssayDto } from './dto/create-essay.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EssaysService {
  constructor(
    @InjectRepository(Essay)
    private essaysRepository: Repository<Essay>,
  ) {}

  async create(createEssayDto: CreateEssayDto, userId: number): Promise<Essay> {
    console.log('Creating essay with DTO:', createEssayDto);
    console.log('User ID:', userId);
    if (!userId) {
      throw new Error('User ID is required to create an essay');
    }
    const essay = this.essaysRepository.create({
      ...createEssayDto,
      user: { id: userId }
    });
    console.log('Essay object before save:', essay);
    const savedEssay = await this.essaysRepository.save(essay);
    console.log('Saved essay:', savedEssay);
    return savedEssay;
  }

  async findAll(userId: number): Promise<Essay[]> {
    return this.essaysRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number, userId: number): Promise<Essay> {
    const essay = await this.essaysRepository.findOne({ where: { id, user: { id: userId } } });
    if (!essay) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }
    return essay;
  }

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.essaysRepository.delete({ id, user: { id: userId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Essay with ID ${id} not found`);
    }
  }
}
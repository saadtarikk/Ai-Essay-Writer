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
    const essay = plainToClass(Essay, createEssayDto);
    essay.user = { id: userId } as any; // Assign the user ID
    return this.essaysRepository.save(essay);
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
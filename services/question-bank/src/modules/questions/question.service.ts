import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './create-question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly qbRepository: Repository<Question>,
  ) {}
  findAll(): Promise<Question[]> {
    return this.qbRepository.find();
  }

  async create(qb: CreateQuestionDto): Promise<Question> {
    try {
      return this.qbRepository.save(qb);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Question> {
    try {
      const qb = await this.qbRepository.findOne({
        where: { id },
        relations: ['options'],
      });
      if (!qb) {
        throw new Error('Question not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, body: CreateQuestionDto): Promise<Question> {
    try {
      const qb = await this.qbRepository.findOne({ where: { id } });
      if (!qb) return undefined;
      Object.assign(qb, body);
      return await this.qbRepository.save(qb);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this.qbRepository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './create-question.dto';
import { Questions } from './question.entity';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly qbRepository: QuestionRepository) {}
  findAll(): Promise<Questions[]> {
    return this.qbRepository.findAll();
  }

  async create(qb: CreateQuestionDto): Promise<Questions> {
    try {
      return this.qbRepository.store(qb);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Questions> {
    try {
      const qb = await this.qbRepository.findById(id);
      if (!qb) {
        throw new Error('Questions not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, qb: CreateQuestionDto): Promise<Questions> {
    try {
      await this.findById(id);
      return await this.qbRepository.updateOne(id, qb);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this.qbRepository.destroy(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

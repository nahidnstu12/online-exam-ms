import { Injectable } from '@nestjs/common';
import { CreateQuestionBankDto } from './dto/create-question-bank.dto';
import { QuestionBank } from './entities/bank.entity';
import { BankRepository } from './repositories/bank.repository';

@Injectable()
export class QuestionBankService {
  constructor(private readonly qbRepository: BankRepository) {}
  findAll(): Promise<QuestionBank[]> {
    return this.qbRepository.findAll();
  }

  async create(qb: CreateQuestionBankDto): Promise<QuestionBank> {
    try {
      return this.qbRepository.store(qb);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<QuestionBank> {
    try {
      const qb = await this.qbRepository.findById(id);
      if (!qb) {
        throw new Error('QuestionBank not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, qb: CreateQuestionBankDto): Promise<QuestionBank> {
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

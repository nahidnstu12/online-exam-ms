import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionBank } from './bank.entity';
import { CreateQuestionBankDto } from './create-bank.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    @InjectRepository(QuestionBank)
    private readonly repository: Repository<QuestionBank>,
  ) {}
  findAll(): Promise<QuestionBank[]> {
    return this.repository.find({ relations: ['questions', 'questionsets'] });
  }

  async create(data: CreateQuestionBankDto): Promise<QuestionBank> {
    try {
      return this.repository.save(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<QuestionBank> {
    try {
      const data = await this.repository.findOne({
        where: { id },
        relations: ['questions', 'questionsets'],
      });
      if (!data) {
        throw new Error('QuestionBank not found.');
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, body: CreateQuestionBankDto): Promise<QuestionBank> {
    try {
      const data = await this.repository.findOne({ where: { id } });
      if (!data) return undefined;
      Object.assign(data, body);
      return await this.repository.save(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

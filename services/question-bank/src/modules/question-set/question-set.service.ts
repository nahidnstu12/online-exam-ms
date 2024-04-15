import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionSetDto } from './create-question-set.dto';
import { QuestionSet } from './question-set.entity';

@Injectable()
export class QuestionSetService {
  constructor(
    @InjectRepository(QuestionSet)
    private readonly repository: Repository<QuestionSet>,
  ) {}
  findAll(): Promise<QuestionSet[]> {
    return this.repository.find();
  }

  // todo: CreateQuestionSetDto error
  async create(data: any, questionBank): Promise<QuestionSet> {
    try {
      const newQuestionSet = await this.repository.save({
        title: data.title,
        isNegetive: data.isNegetive,
        isNegetiveNumber: data.isNegetiveNumber,
        publish: data.publish,
      });
      questionBank.questionsets = [
        ...questionBank.questionsets,
        newQuestionSet,
      ];
      await questionBank.save();

      return newQuestionSet;
    } catch (error) {
      console.log('create question error:', error);

      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<QuestionSet> {
    try {
      const qb = await this.repository.findOne({
        where: { id },
        // relations: ['options'],
      });
      if (!qb) {
        throw new Error('QuestionSet not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, body: CreateQuestionSetDto): Promise<QuestionSet> {
    try {
      const qb = await this.repository.findOne({ where: { id } });
      if (!qb) return undefined;
      Object.assign(qb, body);
      return await this.repository.save(qb);
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

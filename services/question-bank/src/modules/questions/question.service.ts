import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './create-question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {}
  findAll(): Promise<Question[]> {
    return this.repository.find();
  }

  async create(data: CreateQuestionDto, questionBank): Promise<Question> {
    try {
      // let newQuestion;

      const newQuestion = await this.repository.save({
        title: data.title,
        questionType: data.questionType,
        mark: data.mark,
      });

      questionBank.questions = [...questionBank.questions, newQuestion];
      await questionBank.save();

      return newQuestion;
    } catch (error) {
      console.log('create question error:', error);

      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Question> {
    try {
      const qb = await this.repository.findOne({
        where: { id },
        select: {
          options: {
            id: true,
            text: true,
          },
        },
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

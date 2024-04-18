import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Question } from '../questions/question.entity';
import { CreateQuestionSetDto } from './create-question-set.dto';
import { QuestionSet } from './question-set.entity';

@Injectable()
export class QuestionSetService {
  constructor(
    @InjectRepository(QuestionSet)
    private readonly repository: Repository<QuestionSet>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}
  findAll(): Promise<QuestionSet[]> {
    return this.repository.find({ relations: ['questions'] });
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
        select: {
          questions: {
            id: true,
            title: true,
            questionType: true,
            mark: true,
            options: {
              id: true,
              text: true,
            },
          },
        },
        relations: ['questions', 'questions.options'],
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

  async questionAssignToSet(
    setId: any,
    questionIds: number[],
  ): Promise<QuestionSet> {
    const qset = await this.repository.findOne({
      where: { id: setId },
      relations: ['questions'],
    });

    if (!qset) {
      throw new Error('Question Set not found');
    }
    const questions = await this.questionRepository.findBy({
      id: In(questionIds),
    });

    if (!questions.length) {
      throw new Error('No question found with the provided IDs');
    }

    qset.questions = questions;

    console.log('questionset service', qset);

    return this.repository.save(qset); // Save the updated student
  }

  async delete(id: number) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

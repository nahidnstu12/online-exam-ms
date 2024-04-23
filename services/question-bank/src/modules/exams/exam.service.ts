import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamDto } from './create-exam.dto';
import { Exam } from './exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly repository: Repository<Exam>,
  ) {}
  findAll(): Promise<Exam[]> {
    return this.repository.find({
      relations: ['questionset'],
    });
  }

  async create(data: any, qustionSet): Promise<Exam> {
    try {
      const newExam = await this.repository.save({
        title: data.title,
        subject: data.subject,
        duration: data.duration,
        publishedDate: data.publishedDate, //new Date(Date.now()).toISOString() 2024-04-19T16:51:34.076Z timestampz
        examStartDate: data.examStartDate,
        isActive: data.isActive,
      });

      console.log(qustionSet, newExam);

      qustionSet.exam = newExam;
      await qustionSet.save();

      return newExam;
    } catch (error) {
      console.log('create Exam error:', error);

      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Exam> {
    try {
      const qb = await this.repository.findOne({
        where: { id },
        relations: ['questionset'],
      });
      if (!qb) {
        throw new Error('Exam not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, body: CreateExamDto): Promise<Exam> {
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

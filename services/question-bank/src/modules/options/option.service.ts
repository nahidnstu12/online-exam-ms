import { Injectable } from '@nestjs/common';
import { Questions } from '../questions/question.entity';
import { CreateOptionDto } from './create-option.dto';
import { Option } from './option.entity';
import { OptionRepository } from './option.repository';

@Injectable()
export class OptionService {
  constructor(private readonly qbRepository: OptionRepository) {}
  findAll(): Promise<Option[]> {
    return this.qbRepository.findAll();
  }

  async create(qb: CreateOptionDto, question: Questions) {
    try {
      const newOption = await this.qbRepository.save({
        text: qb.text,
        isCorrect: qb.isCorrect,
      });
      console.log('newoption', newOption, question.options);
      question.options = [...question.options, newOption];
      await question.save();
      console.log('last hit');
      // return this.qbRepository.store(qb);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Option> {
    try {
      const qb = await this.qbRepository.findById(id);
      if (!qb) {
        throw new Error('Option not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, qb: CreateOptionDto): Promise<Option> {
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

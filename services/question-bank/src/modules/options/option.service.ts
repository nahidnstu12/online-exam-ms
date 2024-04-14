import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/question.entity';
import { CreateOptionDto } from './create-option.dto';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly repository: Repository<Option>,
  ) {}
  findAll(): Promise<Option[]> {
    return this.repository.find();
  }

  async create(data: CreateOptionDto, question: Question): Promise<Option> {
    try {
      const newOption = await this.repository.save({
        text: data.text,
        isCorrect: data.isCorrect,
      });
      question.options = [...question.options, newOption];
      await question.save();

      return newOption;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Option> {
    try {
      const data = await this.repository.findOne({ where: { id } });
      if (!data) {
        throw new Error('Option not found.');
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, body: CreateOptionDto): Promise<Option> {
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

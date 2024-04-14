import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './create-option.dto';
import { Option } from './option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly qbRepository: Repository<Option>,
  ) {}
  findAll(): Promise<Option[]> {
    return this.qbRepository.find();
  }

  async create(qb: CreateOptionDto): Promise<Option> {
    try {
      return this.qbRepository.save(qb);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<Option> {
    try {
      const qb = await this.qbRepository.findOne({ where: { id } });
      if (!qb) {
        throw new Error('Option not found.');
      }
      return qb;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, body: CreateOptionDto): Promise<Option> {
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

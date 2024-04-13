import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';
import { CreateOptionDto } from './create-option.dto';

export class OptionRepository extends Repository<Option> {
  constructor(
    @InjectRepository(Option)
    private qbRepository: Repository<Option>,
  ) {
    super(qbRepository.target, qbRepository.manager, qbRepository.queryRunner);
  }

  public async findAll(): Promise<Option[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Option | null> {
    return this.findOneBy({ id: id });
  }

  public async store(qb: CreateOptionDto): Promise<Option> {
    const newData = this.create(qb);
    return this.save(newData);
  }

  public async updateOne(
    id: number,
    updateqbDto: CreateOptionDto,
  ): Promise<Option | undefined> {
    const qb = await this.findById(id);
    if (!qb) return undefined;
    Object.assign(qb, updateqbDto);
    return this.save(qb);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}

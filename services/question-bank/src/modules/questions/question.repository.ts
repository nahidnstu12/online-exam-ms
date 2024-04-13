import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from './question.entity';
import { CreateQuestionDto } from './create-question.dto';

export class QuestionRepository extends Repository<Questions> {
  constructor(
    @InjectRepository(Questions)
    private qbRepository: Repository<Questions>,
  ) {
    super(qbRepository.target, qbRepository.manager, qbRepository.queryRunner);
  }

  public async findAll(): Promise<Questions[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Questions | null> {
    return this.findOneBy({ id: id });
  }

  public async store(qb: CreateQuestionDto): Promise<Questions> {
    const newData = this.create(qb);
    return this.save(newData);
  }

  public async updateOne(
    id: number,
    updateqbDto: CreateQuestionDto,
  ): Promise<Questions | undefined> {
    const qb = await this.findById(id);
    if (!qb) return undefined;
    Object.assign(qb, updateqbDto);
    return this.save(qb);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}

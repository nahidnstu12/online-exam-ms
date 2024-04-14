import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './create-question.dto';

export class QuestionRepository extends Repository<Question> {
  constructor(
    @InjectRepository(Question)
    private qbRepository: Repository<Question>,
  ) {
    super(qbRepository.target, qbRepository.manager, qbRepository.queryRunner);
  }

  public async findAll(): Promise<Question[]> {
    return this.find();
  }

  public async findById(id: number): Promise<Question | null> {
    return this.findOneBy({ id: id });
  }

  public async store(qb: CreateQuestionDto): Promise<Question> {
    const newData = this.create(qb);
    return this.save(newData);
  }

  public async updateOne(
    id: number,
    updateqbDto: CreateQuestionDto,
  ): Promise<Question | undefined> {
    const qb = await this.findById(id);
    if (!qb) return undefined;
    Object.assign(qb, updateqbDto);
    return this.save(qb);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionBankDto } from '../dto/create-question-bank.dto';
import { QuestionBank } from '../entities/bank.entity';

export class BankRepository extends Repository<QuestionBank> {
  constructor(
    @InjectRepository(QuestionBank)
    private qbRepository: Repository<QuestionBank>,
  ) {
    super(qbRepository.target, qbRepository.manager, qbRepository.queryRunner);
  }

  public async findAll(): Promise<QuestionBank[]> {
    return this.find();
  }

  public async findById(id: number): Promise<QuestionBank | null> {
    return this.findOneBy({ id: id });
  }

  public async store(qb: CreateQuestionBankDto): Promise<QuestionBank> {
    const newData = this.create(qb);
    return this.save(newData);
  }

  public async updateOne(
    id: number,
    updateqbDto: CreateQuestionBankDto,
  ): Promise<QuestionBank | undefined> {
    const qb = await this.findById(id);
    if (!qb) return undefined;
    Object.assign(qb, updateqbDto);
    return this.save(qb);
  }

  public async destroy(id: number): Promise<void> {
    await this.delete(id);
  }
}

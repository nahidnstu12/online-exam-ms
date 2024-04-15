import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionBank } from '../question-bank/bank.entity';

@Entity('questionsets')
export class QuestionSet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  isNegetive: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  isNegetiveNumber: number;

  @Column({
    type: 'boolean',
    default: 1,
  })
  publish: boolean;

  @ManyToOne(() => QuestionBank, (qb) => qb.questionsets)
  questionBank: QuestionBank;
}

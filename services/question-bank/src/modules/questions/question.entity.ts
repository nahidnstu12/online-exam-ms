import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from '../options/option.entity';
import { QuestionBank } from '../question-bank/bank.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  questionType: string;

  @Column({
    type: 'varchar',
  })
  mark: number;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @ManyToOne(() => QuestionBank, (qb) => qb.questions)
  questionBank: QuestionBank;
}

import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from '../exams/exam.entity';
import { QuestionBank } from '../question-bank/bank.entity';
import { Question } from '../questions/question.entity';

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

  @ManyToMany(() => Question, (ques) => ques.questionsets)
  questions: Question[];

  @OneToOne(() => Exam, (qb) => qb.questionset)
  exam: Exam;
}

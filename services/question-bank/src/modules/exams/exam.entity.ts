import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionSet } from '../question-set/question-set.entity';

@Entity('exams')
export class Exam extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  subject: string;

  @Column({
    type: 'varchar',
  })
  duration: number;

  @Column({ type: 'timestamptz' })
  examStartDate: Date;

  @Column({ type: 'timestamptz' })
  publishedDate: Date;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @OneToOne(() => QuestionSet, (qb) => qb.exam)
  @JoinColumn()
  questionset: QuestionSet;
}

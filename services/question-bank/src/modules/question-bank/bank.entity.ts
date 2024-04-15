import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionSet } from '../question-set/question-set.entity';
import { Question } from '../questions/question.entity';

@Entity('questionBank')
export class QuestionBank extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The bank unique identifier',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  teacherId: number;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @OneToMany(() => Question, (question) => question.questionBank)
  questions: Question[];

  @OneToMany(() => QuestionSet, (set) => set.questionBank)
  questionsets: QuestionSet[];
}
